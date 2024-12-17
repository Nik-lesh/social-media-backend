import express from "express";
import UserController from "./user.controller.js";
import { verifyOTP } from "../../utils/otp./veifyOTP.js";
import { auth } from "../../middleware/jwt/jwt.auth.js";
const router = express.Router();

const userController = new UserController();

router.route("/signup").post(userController.registerUser);
router.route("/login").post(userController.loginUser);
router.get("/:username", auth, userController.getUserByUsername);
router.put("/updateUser/:id", auth, userController.updateUser);
router.post("/reset-password", userController.sendUpdateUserPassword);
router.post("/verify-otp", auth, verifyOTP);
router.put("/update-password", auth, userController.updateUserPassword);
router.delete("/:id", auth, userController.deleteUser);
router.post("/logout", auth, userController.logoutUser);
router.get("/follow/:id", auth, userController.updateFollowers);
router.get("/unfollow/:id", auth, userController.removeFollowers);

export default router;
