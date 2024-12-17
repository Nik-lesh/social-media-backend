import express from "express";
import {
  createLikeController,
  removeLikeController,
  getlikesByPostIdController,
} from "./like.controller.js";
import { auth } from "../../middleware/jwt/jwt.auth.js";
const router = express.Router();

router.post("/:postId", auth, createLikeController);
router.get("/:postId/likes", auth, getlikesByPostIdController);
router.delete("/:postId", auth, removeLikeController);
export default router;
