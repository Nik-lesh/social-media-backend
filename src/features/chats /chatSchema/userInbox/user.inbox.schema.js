import mongoose from "mongoose";

export const userInboxSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
  inbox:[
    {
     messenger:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
     },
     isGroup:{
        type:Boolean,
        default:false
     },
     lastMessage:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
     },
     unreadCount:{
        type:Number,
        default:0
     },
     categories:{
        type: String,
        required: true,
        enums: ["private", 'general', 'request' ]
     },

  }]
});

export const UserInboxModel = mongoose.model("UserInbox", userInboxSchema);