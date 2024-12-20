import { LikeModel } from "./likeSchema/like.schema.js";

import mongoose from "mongoose";
export const createLike = async (postId, userId) => {
  try {
    const likeExist = await LikeModel.findOne({ post: postId, user: userId });
    const postExist = await LikeModel.findOne({ post: postId });
    if (likeExist) {
      console.log("Like already exist!", likeExist);
      return likeExist;
    } else if (postExist) {
      const newLike = await LikeModel.findOneAndUpdate(
        { post: postId },
        { $push: { user: userId } },
        { new: true },
        { runValidators: true }
      );
      return newLike;
    } else {
      const newLike = await LikeModel.create({ post: postId, user: userId });
      return newLike;
    }
  } catch (error) {
    console.error(`Error creating like: ${error.message}`);
    throw new customErrorHandle(401, "Error creating like");
  }
};

export const getlikesByPostId = async (postId) => {
  try {
    // const likes = await LikeModel.findOne({ post: postId });
    // const user = likes.user;

    const likeUser = await LikeModel.aggregate([
      { $match: { post: new mongoose.Types.ObjectId(postId) } },
      {
        $unwind: "$user",
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
          _id: 0,
          "userDetails.username": 1,
          "userDetails.name": 1,
          "userDetails.avatar": 1,
        },
      },
      {
        $limit: 30,
      },
    ]);

    return likeUser;
  } catch (error) {
    console.error(`Error getting likes by post id: ${error.message}`);
    throw new customErrorHandle(401, "Error getting likes by post id");
  }
};

export const removeLike = async (postId, userId) => {
  try {
    const deletedLike = await LikeModel.findOneAndUpdate(
      {
        post: postId,
      },
      { $pull: { user: userId } },
      { new: true },
      { runValidators: true }
    );
    return deletedLike;
  } catch (error) {
    console.error(`Error deleting like: ${error.message}`);
    throw new customErrorHandle(401, "Error deleting like");
  }
};
