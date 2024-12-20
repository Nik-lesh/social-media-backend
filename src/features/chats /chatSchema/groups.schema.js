import mongoose from "mongoose";

export const groupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    groupIcon: {
        type: String,
    },
    members: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
    ],
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Chat",
            required: true,
        },
    ],
},{
    timestamps: true,
});