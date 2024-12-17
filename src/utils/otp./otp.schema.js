// models/OTP.js
import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  otp: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: 300,
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

export const OTP = mongoose.model("OTP", otpSchema);