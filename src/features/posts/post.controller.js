import {
  createPost,
  getPostsByUserId,
  updatePost,
  deletePost,
  updateShare,
} from "./post.repository.js";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
import mongoose from "mongoose";
export const createPostController = async (req, res) => {
  try {
    const userId = new mongoose.Types.ObjectId(req.user._id);
    console.log(userId);
    console.log(req.body);
    const post = await createPost(userId, req.body);
    res.status(201).json({ success: true, res: post });
  } catch (error) {
    console.error(`Error creating post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to create post");
  }
};
export const getPostsByUserIdController = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const posts = await getPostsByUserId(userId);
    res.status(200).json({ success: true, res: posts });
  } catch (error) {
    console.error(`Error getting posts by user id: ${error.message}`);
    throw new customErrorHandler(400, "Unable to get posts by user id");
  }
};
export const updatePostController = async (req, res) => {
  try {
    const post = await updatePost(req.params.postId, req.body);
    res.status(200).json({ success: true, res: post });
  } catch (error) {
    console.error(`Error updating post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to update post");
  }
};
export const updateShareController = async (req, res) => {
  try {
    const post = await updateShare(req.params.postId);
    res
      .status(200)
      .json({ success: true, message: "share successfull", res: post });
  } catch (error) {
    console.error(`Error updating share: ${error.message}`);
    throw new customErrorHandler(400, "Unable to update share");
  }
};
export const deletePostController = async (req, res) => {
  try {
    const post = await deletePost(req.params.postId);
    res.status(200).json({ success: true, message: "post deleted", res: post });
  } catch (error) {
    console.error(`Error deleting post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to delete post");
  }
};
