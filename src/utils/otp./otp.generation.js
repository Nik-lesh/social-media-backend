import { OTP } from "./otp.schema.js";
export const generateOTP = async (userId) => {
  const newOTP = Math.floor(100000 + Math.random() * 900000); // 6 digit
  console.log(newOTP);
  await OTP.create({
    user: userId,
    otp: newOTP,
  });
  return newOTP;
};
