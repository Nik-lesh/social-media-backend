import mongoose from "mongoose";

export const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      minLenght: [3, "Username must be at least 3 characters long"],
      maxLenght: [20, "Username must be at most 20 characters long"],
      match: [
        /^[a-zA-Z0-9_]+$/,
        "Username can only contain letters, numbers, and underscores",
      ],
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please use a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    gender: {
      type: String,
      required: true,
      enums: {
        values: ["male", "female", "others"],
        message: "Gender must be one of the following: male, female, or others",
        toLowerCase: true,
      },
    },
    age: {
      type: Number,
      required: true,
      min: [16, "Age must be at least 16 years old"],
    },
    following: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Following",
      },
    ],
    followers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Follower",
      },
    ],
    bio: {
      type: String,
      min: [1, "Bio must be at least 1 character long"],
      max: [150, "Bio must be at most 150 characters long"],
    },

    avatar: {
      type: String,
      match: [
        /^https?:\/\/(www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(\/[^\s]*)?$/,
        "Please provide a valid URL for avatar",
      ],
    },
  },
  {
    timestamps: true,
  }
);

export const User = mongoose.model("User", userSchema);
