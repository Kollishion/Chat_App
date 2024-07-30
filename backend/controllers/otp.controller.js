import User from "../models/user.model.js";
import { sendOtpEmail } from "../utils/mailer.js";
import crypto from "crypto";

export const sendOtp = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.otp = crypto.createHash("sha256").update(otp).digest("hex");
    user.otpExpiry = Date.now() + 3600000; // 1 hour expiry
    await user.save();

    sendOtpEmail(email, otp);

    res.json({ message: "OTP sent" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const hashedOtp = crypto.createHash("sha256").update(otp).digest("hex");
    if (user.otp !== hashedOtp || Date.now() > user.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "OTP verified" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
