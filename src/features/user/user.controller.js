import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
import UserRepository from "./user.respository.js";
import { comparePassword, hashPassword } from "../../utils/hash.password.js";
import generateToken from "../../middleware/jwt/jwtToken.js";
import { generateOTP } from "../../utils/otp./otp.generation.js";
import { sendEmail } from "../../utils/otp./sendOTP.js";
import mongoose from "mongoose";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }
  registerUser = async (req, res, next) => {
    try {
      console.log(req.body);
      const { name, username, password, email, gender, age } = req.body;

      const encriptedPassword = await hashPassword(password);

      const user = await this.userRepository.createUser({
        name,
        username,
        email,
        password: encriptedPassword,
        gender,
        age,
      });
      if (!user) {
        return next(new customErrorHandler(400, "Unable to create user"));
      }

      res.status(201).json({ success: true, res: user });
    } catch (error) {
      console.error(`Error creating user: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };

  loginUser = async (req, res, next) => {
    try {
      console.log(req.body);
      //identifier is username or email
      const { identifier, password } = req.body;
      console.log(identifier);
      const isEmail = identifier.includes("@");
      console.log(isEmail);

      const user = isEmail
        ? await this.userRepository.getUserByEmail(identifier)
        : await this.userRepository.getUserByUsername(identifier);
      if (!user) {
        return next(new customErrorHandler(404, "User not found"));
      }
      console.log(user);
      console.log(password, user.res.password);
      const isPasswordMatch = await comparePassword(
        password,
        user.res.password
      );
      if (!isPasswordMatch) {
        return next(new customErrorHandler(401, "Invalid password"));
      } else {
        generateToken(res, user.res);
        console.log(user.res);
        res.status(200).json({ success: true, res: user });
      }
    } catch (error) {
      console.error(`Error login user: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };
  getUserByUsername = async (req, res, next) => {
    try {
      const { username } = req.params;
      const user = await this.userRepository.getUserByUsername(username);
      if (!user) {
        return next(customErrorHandler(404, "User not found"));
      }
      res.status(200).json({ success: true, res: user });
    } catch (error) {
      console.error(`Error getting user by username: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };
  updateUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.updateUser(id, req.body);
      if (!user) {
        return next(customErrorHandler(404, "User not found"));
      }
      res.status(200).json({ success: true, res: user });
    } catch (error) {
      console.error(`Error updating user: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };

  sendUpdateUserPassword = async (req, res) => {
    try {
      const { identifier } = req.body;
      console.log(identifier);
      const isEmail = identifier.includes("@");
      console.log(isEmail);
      const user = isEmail
        ? await this.userRepository.getUserByEmail(identifier)
        : await this.userRepository.getUserByUsername(identifier);
      console.log(user);
      if (!user) {
        return next(new customErrorHandler(404, "User not found"));
      } else {
        const otp = await generateOTP(user.res._id);
        generateToken(res, user.res);
        await sendEmail(user.res.email, otp);
        res
          .status(200)
          .json({ success: true, message: "Otp send successfully!" });
      }
    } catch (error) {
      console.error(`Error updating user password: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };

  updateUserPassword = async (req, res, next) => {
    try {
      const id = new mongoose.Types.ObjectId(req.user._id);
      const password = await hashPassword(req.body.password);
      console.log("update password", id);
      const user = await this.userRepository.updateUserPassword(id, password);
      if (!user) {
        return next(customErrorHandler(404, "User not found"));
      }
      res
        .status(200)
        .json({
          success: true,
          message: "Password updated successfully!",
          res: user,
        });
    } catch (error) {
      console.error(`Error updating user password: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };

  deleteUser = async (req, res, next) => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.deleteUser(id);
      if (!user) {
        return next(customErrorHandler(404, "User not found"));
      }
      res.status(200).json({ success: true, res: user });
    } catch (error) {
      console.error(`Error deleting user: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };

  logoutUser = async (req, res, next) => {
    try {
      res.clearCookie("jwt");
      console.log("user logged out ");
      res.status(200).json({ success: true, message: "Logout successful" });
    } catch (error) {
      console.error(`Error logging out user: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };

  updateFollowers = async (req, res, next) => {
    try {
      const { id } = req.params;
      console.log(id);
      console.log(req.body.userId);
      const user = await this.userRepository.followUser(id, req.body.userId);
      if (!user) {
        return next(new customErrorHandler(404, "User not found"));
      }
      res.status(200).json({ success: true, res: user });
    } catch (error) {
      console.error(`Error updating followers: ${error.message}`);
      return next(new customErrorHandler(500, "Internal Server Error"));
    }
  };
}
