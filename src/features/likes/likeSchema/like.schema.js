import mongoose from "mongoose";

export const likeSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "posts",
    required: true,
  },
  user: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export const LikeModel = mongoose.model("Like", likeSchema);
