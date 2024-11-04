import { useState } from "react";
import { useDispatch } from "react-redux";
import { signupUser } from "../redux/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useSignup = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
    email,
  }) => {
    const isValid = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      email,
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
          email,
        })
      );
      toast.success("Signup successful!");
      setLoading(false);
      navigate("/login");
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "An unexpected error occurred.";
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
  email,
}) => {
  if (
    !fullName ||
    !username ||
    !password ||
    !confirmPassword ||
    !gender ||
    !email
  ) {
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
