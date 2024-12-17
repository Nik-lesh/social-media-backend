import mongoose from "mongoose";
import { PostModel } from "../schema /post.schema.js";
import { customErrorHandler } from "../../../middleware/errorHandling/error.handling.js";

export const postRepository = async (postId) => {
  try {
    const post = await PostModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(postId) },
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
        $lookup: {
          from: "likes",
          localField: "_id",
          foreignField: "post",
          as: "likesArray",
        },
      },
      {
        $unwind: { path: "$likesArray", preserveNullAndEmptyArrays: true },
      },
      {
        $lookup: {
          from: "comments",
          localField: "_id",
          foreignField: "post",
          as: "commentsArray",
        },
      },
      {
        $unwind: { path: "$commentsArray", preserveNullAndEmptyArrays: true },
      },

      {
        $project: {
          _id: 0,
          "userDetails.username": 1,
          "userDetails.name": 1,
          "userDetails.avatar": 1,
          image: 1,

          likeCount: { $size: "$likesArray.user" },
          commentCount: { $size: "$commentsArray.comments" },
          share: 1,
        },
      },
    ]);
    return post;
  } catch (error) {
    console.error(`Error creating post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to create post");
  }
};
