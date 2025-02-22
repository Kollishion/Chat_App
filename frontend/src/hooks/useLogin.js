import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async ({ username, password }) => {
    if (!validateInput({ username, password })) return;

    setLoading(true);
    try {
      const actionResult = await dispatch(loginUser({ username, password }));

      if (loginUser.fulfilled.match(actionResult)) {
        const user = actionResult.payload;
        if (!user || !user._id) throw new Error("User data is missing!");

        console.log("✅ Login successful:", user);
        toast.success(`Welcome back, ${user.username}!`);
      } else {
        throw new Error(actionResult.payload || "Login failed!");
      }
    } catch (error) {
      console.error("❌ Login error:", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

const validateInput = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all fields.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};

export default useLogin;
