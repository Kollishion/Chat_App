import express from "express";
import { sendOtp, verifyOtp } from "../controllers/otp.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.post("/send-otp", protectRoute, sendOtp);
router.post("/verify-otp", protectRoute, verifyOtp);

export default router;
