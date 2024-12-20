import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
import { customErrorHandler } from "../errorHandling/error.handling.js";

export const auth = (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      throw new customErrorHandler("Token not found");
    }
    if (!process.env.JWT_SECRET) {
      throw new customErrorHandler("JWT secret not found");
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (error) {
    console.error(`Error verifying token: ${error.message}`);
    res.status(401).json({
      success: false,
      message: "User has been logged out, please login to continue",
    });
  }
};
