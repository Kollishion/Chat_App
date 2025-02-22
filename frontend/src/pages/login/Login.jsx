import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import useLogin from "../../hooks/useLogin";
import { useDispatch, useSelector } from "react-redux";
const Login = () => {
  const [inputs, setInputs] = useState({ username: "", password: "" });
  const { login, loading } = useLogin();
  const { isAuthenticated, status, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(inputs);
  };

  useEffect(() => {
    if (isAuthenticated && user) {
      toast.success("Login successful!");
      navigate("/");
    } else if (status === "failed") {
      toast.error("Failed to log in. Please check your credentials.");
    }
  }, [isAuthenticated, status, user, dispatch, navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login <span className="text-blue-300">ChatApp</span>
        </h1>

        <form method="POST" onSubmit={handleSubmit}>
          <div>
            <label className="label p-2" htmlFor="username">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="Enter username"
              className="w-full input input-bordered h-10"
              name="username"
              id="username"
              autoComplete="username"
              required
              value={inputs.username}
              onChange={(e) =>
                setInputs({ ...inputs, username: e.target.value })
              }
            />
          </div>

          <div>
            <label className="label" htmlFor="password">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="password"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              value={inputs.password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
            />
          </div>

          <div className="flex flex-row-reverse gap-20 text-base">
            <Link
              to="/signup"
              className="hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              {"Don't"} have an account?
            </Link>
            <Link
              to="/forgotpassword"
              className="hover:underline hover:text-blue-600 mt-2 inline-block"
            >
              Forgot password?
            </Link>
          </div>

          <div>
            <button
              type="submit"
              className="btn btn-block btn-sm mt-2"
              disabled={loading} // Disable button if loading
            >
              {loading ? (
                <span className="loading loading-spinner"></span>
              ) : (
                "Login"
              )}
            </button>
            {status === "failed" && (
              <p className="text-red-500">
                {/* Optionally display error messages here */}
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
