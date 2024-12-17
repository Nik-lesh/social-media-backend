import express from "express";
import {
  createCommentController,
  deleteCommentController,
  updateCommentController,
  getCommentsByPostIdController,
} from "./comment.controller.js";
import { auth } from "../../middleware/jwt/jwt.auth.js";
const router = express.Router();

router.post("/:postId/createComment", auth, createCommentController);
router.delete("/:postId/:commentId", auth, deleteCommentController);
router.put("/:postId/:commentId", auth, updateCommentController);
router.get("/:postId/comments", auth, getCommentsByPostIdController);
export default router;
