import Login from "./pages/login/Login";
import SignUp from "./pages/signup/SignUp";
import Home from "./pages/home/Home";
import { Routes, Route } from "react-router-dom";
import ForgotPassword from "./pages/forgotpassword/ForgotPassword";
import { Toaster } from "react-hot-toast";
import Navbar from "./components/navbar/Navbar";
import PrivateRoute from "./components/privateRoute/PrivateRoute";
import ResetPassword from "./pages/forgotpassword/ResetPassword";

function App() {
  return (
    <>
      <Navbar />
      <div className="p-4 h-screen flex justify-center items-center">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route
            path="/reset-password/:id/:token"
            element={<ResetPassword />}
          />
          <Route element={<PrivateRoute />}>
            <Route path="/" element={<Home />} />
          </Route>
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
