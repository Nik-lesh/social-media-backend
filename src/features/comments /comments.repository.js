import { CommentModel } from "./schema/comments.schema.js";
import mongoose from "mongoose";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
export const createComment = async (userId, postId, comment) => {
  try {
    const postExist = await CommentModel.findOne({ post: postId });
    if (postExist) {
      const newComment = await CommentModel.findOneAndUpdate(
        { post: postId },
        { $push: { comments: { user: userId, content: comment } } },
        { new: true }
      );
      return newComment;
    } else {
      const newComment = await CommentModel.create({
        post: postId,
        comments: {
          user: userId,
          content: comment,
        },
      });
      return newComment;
    }
  } catch (error) {
    console.error(`Error creating comment: ${error.message}`);
    throw new customErrorHandler("Unable to create comment");
  }
};

export const getCommentsByPostId = async (postId) => {
  try {
    const comments = await CommentModel.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      { $unwind: "$comments" },
      {
        $lookup: {
          from: "users",
          localField: "comments.user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          "userDetails.username": 1,
          "userDetails.name": 1,
          "userDetails.avatar": 1,
          "comments.content": 1,
        },
      },
    ]);
    return comments;
  } catch (error) {
    console.error(`Error getting comments: ${error.message}`);
    throw new customErrorHandler("Unable to get comments");
  }
};

export const updateComment = async (postId, commentId, comment) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      { post: postId },
      { comments: { $elemMatch: { _id: commentId } } },
      { $set: { content: comment } },
      { new: true, runValidators: true }
    );
    if (!updatedComment) {
      throw new customErrorHandler("Comment not found");
    }
    return updatedComment;
  } catch (error) {
    console.error(`Error updating comment: ${error.message}`);
    throw new customErrorHandler("Unable to update comment");
  }
};
export const deleteComment = async (postId, commentId) => {
  try {
    const comment = await CommentModel.findByIdAndUpdate(
      { post: postId },
      { comments: { $elemMatch: { _id: commentId } } },
      { $pull: { comments: { _id: commentId } } },
      { new: true, runValidators: true }
    );
    if (!comment) {
      throw new customErrorHandler("Comment not found");
    }
    return comment;
  } catch (error) {
    console.error(`Error deleting comment: ${error.message}`);
    throw new customErrorHandler("Unable to delete comment");
  }
};
