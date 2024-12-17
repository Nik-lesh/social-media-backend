import {
  createComment,
  deleteComment,
  updateComment,
  getCommentsByPostId,
} from "./comments.repository.js";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
export const createCommentController = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;

    const comment = await createComment(userId, postId, req.body.content);
    res
      .status(201)
      .json({ success: true, message: "comment posted", res: comment });
  } catch (error) {
    console.error(`Error creating comment: ${error.message}`);
    throw new customErrorHandler(400, "Unable to create comment");
  }
};
export const getCommentsByPostIdController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const comments = await getCommentsByPostId(postId);
    res.status(200).json({ success: true, res: comments });
  } catch (error) {
    console.error(`Error getting comments by post id: ${error.message}`);
    throw new customErrorHandler(400, "Unable to get comments by post id");
  }
};
export const updateCommentController = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const comment = await updateComment(postId, commentId, req.body.content);
    res
      .status(200)
      .json({ success: true, message: "comment updated", res: comment });
  } catch (error) {
    console.error(`Error updating comment: ${error.message}`);
    throw new customErrorHandler(400, "Unable to update comment");
  }
};
export const deleteCommentController = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const postId = req.params.postId;
    const deletedComment = await deleteComment(postId, commentId);
    res.status(200).json({
      success: true,
      message: "comment deleted",
      res: deletedComment,
    });
  } catch (error) {
    console.error(`Error deleting comment: ${error.message}`);
    throw new customErrorHandler(401, "Error deleting comment");
  }
};
