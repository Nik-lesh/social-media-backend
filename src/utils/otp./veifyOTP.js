import { OTP } from "./otp.schema.js";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
import mongoose from "mongoose";

export const verifyOTP = async (req, res) => {
  const userId = req.user._id;
  console.log(userId);
  const { otp } = req.body;

  try {
    const userOtp = await OTP.findOne({ user: userId });
    console.log("enter otp", userOtp);
    if (!userOtp) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid or expired OTP" });
    }

    if (userOtp.otp !== parseInt(otp, 10)) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    userOtp.verified = true;
    await userOtp.save();

    res
      .status(200)
      .json({ success: true, message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error.message);

    throw new customErrorHandler(500, "internal server error");
  }
};
