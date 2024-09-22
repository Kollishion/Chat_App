import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { resetPasswordUser } from "../../redux/authSlice.js";
import { useParams, useNavigate } from "react-router-dom";

const ResetPassword = () => {
  const { id, token } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.password !== input.confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    dispatch(resetPasswordUser({ id, token, password: input.password }))
      .unwrap()
      .then(() => {
        alert("Password reset successful");
        navigate("/login");
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Reset Password
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mt-4 text-gray-700">
            New Password
            <input
              type="password"
              placeholder="Enter new password"
              className="w-full px-4 py-2 mt-2 border rounded-md"
              value={input.password}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
          </label>

          <label className="block mt-4 text-gray-700">
            Confirm Password
            <input
              type="password"
              placeholder="Confirm new password"
              className="w-full px-4 py-2 mt-2 border rounded-md"
              value={input.confirmPassword}
              onChange={(e) =>
                setInput({ ...input, confirmPassword: e.target.value })
              }
            />
          </label>

          <button
            type="submit"
            className="w-full mt-6 text-white bg-blue-500 px-4 py-2 rounded-md"
          >
            {status === "loading" ? "Resetting..." : "Reset Password"}
          </button>
        </form>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
