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
        "http://localhost:5000/api/auth/logout",
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
