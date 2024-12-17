import express from "express";
import {
  createPostController,
  updatePostController,
  deletePostController,
  getPostsByUserIdController,
  updateShareController,
} from "./post.controller.js";
import { postController } from "./post/post.controller.js";
import { auth } from "../../middleware/jwt/jwt.auth.js";
const router = express.Router();

router.post("/createPost", auth, createPostController);
router.get("/", auth, getPostsByUserIdController);
router.put("/:postId", auth, updatePostController);
router.post("/share/:postId", auth, updateShareController);
router.delete("/deletePost/:postId", auth, deletePostController);
router.get("/:postId", auth, postController);

export default router;
