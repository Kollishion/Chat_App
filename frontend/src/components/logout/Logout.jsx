import { useDispatch } from "react-redux";
import { logout } from "../../redux/authSlice";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BiLogOut } from "react-icons/bi";

const Logout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(
        "https://chat-app-yg9v.onrender.com/api/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );

      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.error("Logout failed: ", error);
    }
  };

  return (
    <button onClick={handleLogout}>
      <BiLogOut className="w-6 h-6 text-white cursor-pointer flex flex-col" />
    </button>
  );
};

export default Logout;
