import { Link } from "react-router-dom";
import { CgMenuRound } from "react-icons/cg";
import { useSelector } from "react-redux";
import Logout from "../logout/Logout";

const Navbar = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  return (
    <div className="fixed w-[100%]">
      <div className="navbar bg-base-100">
        <div className="flex-1">
          <Link to="/" className="btn btn-ghost text-xl text-blue-300">
            ChatApp
          </Link>
        </div>
        <div className="flex-none">
          <ul className="menu menu-horizontal px-1">
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <details>
                <summary className="text-2xl">
                  <CgMenuRound />
                </summary>
                <ul className="bg-base-100 rounded-t-none p-2">
                  {isAuthenticated ? (
                    <li>
                      <Logout />
                    </li>
                  ) : (
                    <>
                      <li>
                        <Link to="/signup">Signup</Link>
                      </li>
                      <li>
                        <Link to="/login">Login</Link>
                      </li>
                    </>
                  )}
                </ul>
              </details>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
