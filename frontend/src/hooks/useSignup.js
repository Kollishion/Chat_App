import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/authSlice";
import toast from "react-hot-toast";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const isValid = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });

    if (!isValid) return;

    setLoading(true);
    try {
      await dispatch(
        signupUser({
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        })
      );
      toast.success("Signup successful!");
    } catch (error) {
      const errorMessage = error?.message || "An unexpected error occurred.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return { signup, loading };
};

export default useSignup;

const handleInputErrors = ({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) => {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill in all the fields.");
    return false;
  }

  if (password !== confirmPassword) {
    toast.error("Passwords do not match.");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters long.");
    return false;
  }

  return true;
};
