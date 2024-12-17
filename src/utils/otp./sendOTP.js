import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";

export const sendEmail = async (email, otp) => {
  const mail = process.env.EMAIL;
  console.log(mail);
  const password = process.env.PASSWORD;
  console.log(password);
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: mail,
      to: email,
      subject: "OTP Verification",
      text: `Your OTP is ${otp}. It is valid for 5 minutes.`,
    };
    console.log(mailOptions);
    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        return console.log("Email error identified", error);
      } else {
        console.log("Email sent successfully");
      }
    });
  } catch (error) {
    console.error("Error sending email:", error.message);
    throw new customErrorHandler(404, "Unable to send OTP email");
  }
};
