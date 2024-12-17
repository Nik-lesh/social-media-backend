import mongoose from "mongoose";

export const chatSchema = new mongoose.Schema(
  {
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    messageArray: [
      {
        message: {
          type: String,
        },
        attachment: [
          {
            type: String,
          },
        ],
        isRead: {
          type: Boolean,
          default: false,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

export const ChatModel = mongoose.model("Chat", chatSchema);
