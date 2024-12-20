import { PostModel } from "./schema/post.schema.js";
import mongoose from "mongoose";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
export const createPost = async (userId, post) => {
  try {
    const newPost = await PostModel.create({
      user: userId,
      ...post,
    });
    return newPost;
  } catch (error) {
    console.error(`Error creating post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to create post");
  }
};
export const getPostsByUserId = async (userId) => {
  console.log(userId);
  try {
    const posts = await PostModel.aggregate([
      {
        $match: { user: new mongoose.Types.ObjectId(userId) },
      },
      {
        $lookup: {
          from: "users",
          localField: "user",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      {
        $unwind: "$userDetails",
      },
      {
        $project: {
          content: 1,
          image: 1,
          "userDetails.name": 1,
          "userDetails.username": 1,
          followerCount: { $size: "$userDetails.followers" },
          followingCount: { $size: "$userDetails.following" },
        },
      },
    ]);
    console.log(posts);
    return posts;
  } catch (error) {
    console.error(`Error getting posts by user id: ${error.message}`);
    throw new customErrorHandler(400, "Unable to get posts by user id");
  }
};
export const updatePost = async (id, post) => {
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $set: post },
      { new: true, runValidators: true }
    );
    if (!updatedPost) {
      throw new customErrorHandler(404, "Post not found");
    }
    return updatedPost;
  } catch (error) {
    console.error(`Error updating post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to update post");
  }
};
export const updateShare = async (postId) => {
  try {
    const post = await PostModel.findByIdAndUpdate(
      { _id: postId },
      { $inc: { share: 1 } },
      { new: true, runValidators: true }
    );
    return post;
  } catch (error) {
    console.error(`Error updating share: ${error.message}`);
    throw new customErrorHandler(400, "Unable to update share");
  }
};
export const deletePost = async (id) => {
  try {
    const post = await PostModel.findByIdAndDelete(id);
    if (!post) {
      throw new customErrorHandler(404, "Post not found");
    }
    return post;
  } catch (error) {
    console.error(`Error deleting post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to delete post");
  }
};
