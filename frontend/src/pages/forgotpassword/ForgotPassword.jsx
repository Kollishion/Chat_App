import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { forgetPasswordUser } from "../features/auth/authSlice";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.auth);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email) {
      dispatch(forgetPasswordUser({ email }));
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-full max-w-md p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold text-center text-gray-700">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit}>
          <label className="block mt-4 text-gray-700">
            Email Address
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 mt-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <button
            type="submit"
            className="w-full mt-6 text-white bg-blue-500 px-4 py-2 rounded-md"
          >
            {status === "loading" ? "Sending..." : "Send Reset Link"}
          </button>
        </form>
        {error && <p className="mt-2 text-red-600">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
