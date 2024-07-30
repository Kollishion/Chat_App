import express from "express";
import {
  login,
  logout,
  signup,
  forgotPassword,
  resetPassword,
} from "../controllers/auth.controller.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.post("/forgetpassword", forgotPassword);
router.post("/resetPassword/:id/:token", resetPassword);

export default router;
