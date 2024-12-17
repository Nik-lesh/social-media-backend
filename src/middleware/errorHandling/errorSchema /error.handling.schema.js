import mongoose from "mongoose";

export const errorSchema = new mongoose.Schema(
  {
    type: {
      type: String,
      enums: { value: ["Application-error", "Client-request-error"] },
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    status: {
      type: Number,
      required: true,
    },
    stackTrace: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const ErrorModel = mongoose.model("Error", errorSchema);
