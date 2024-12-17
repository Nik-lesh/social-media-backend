import { customErrorHandler } from "../middleware/errorHandling/error.handling.js";
import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  } catch (error) {
    console.error(`Error hashing password: ${error.message}`);
    throw new customErrorHandler(400, "Unable to hash password");
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    console.error(`Error comparing password: ${error.message}`);
    throw new customErrorHandler(400, "Unable to compare password");
  }
};
