import { useState } from "react";
import { useDispatch } from "react-redux";
import { loginUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const login = async ({ username, password }) => {
    const isValid = handleInputErrors({
      username,
      password,
    });

    if (!isValid) return;

    setLoading(true);
    try {
      dispatch(
        loginUser({
          username,
          password,
        })
      );
      toast.success("Login successful!");
      setLoading(false);
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { login, loading };
};

export default useLogin;

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Please fill in all the fields.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};
