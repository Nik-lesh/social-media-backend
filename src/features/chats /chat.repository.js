import { ChatModel } from "./chatSchema/chat.schema";
import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
export class ChatRepository {
  async createChat(sender, receiver, message) {
    try {
      const newChat = await ChatModel.create({
        sender,
        receiver,
        message,
      });
      return newChat;
    } catch (error) {
      console.error(`Message was not saved to db: ${error.message}`);
      throw new customErrorHandler(
        400,
        "Unable to establish chat please try again later..."
      );
    }
  }
  async getChat(sender, receiver, limit = 50, page = 1) {
    try {
      const chat = await ChatModel.aggregate([
        {
          $match: { sender, receiver },
        },
        {
          $unwind: "$messageArray",
        },
        {
          $sort: { "messageArray.createdAt": -1 },
        },
        {
          $skip: (page - 1) * limit,
        },
        {
          $limit: limit,
        },
        {
          $project: {
            _id: 0,
            "messageArray.message": 1,
            "messageArray.attachment": 1,
            "messageArray.isRead": 1,
          },
        },
      ]);
      return { success: true, res: chat };
    } catch (error) {
      console.error(`Error getting chat: ${error.message}`);
      throw new customErrorHandler(
        400,
        "Internal server error, try agian after some time"
      );
    }
  }
  async uploadMessage(sender, receiver, message, attachment) {
    try {
      const uploadMessage = await ChatModel.updateOne(
        { sender, receiver },
        { $push: { messageArray: { message, attachment } } },
        {
          new: true,
          runValidators: true,
        }
      );
      return uploadMessage;
    } catch (error) {
      console.error(`Message was not saved to db: ${error.message}`);
      throw new customErrorHandler(
        400,
        "Unable to send the mesage please try again..."
      );
    }
  }
  async updateIsRead(sender, receiver) {
    try {
      const updateIsRead = await ChatModel.updateOne(
        { sender, receiver },
        { $set: { "messageArray.isRead": true } },
        { new: true, runValidators: true }
      );
      return updateIsRead;
    } catch (error) {
      console.error(`Message was not saved to db: ${error.message}`);
      throw new customErrorHandler(
        400,
        "Unable to send the mesage please try again..."
      );
    }
  }
  async deleteMessage(sender, receiver, message, attachment) {
    try {
      const deleteMessage = await ChatModel.updateOne(
        { sender, receiver },
        { $pull: { messageArray: { message, attachment } } },
        { new: true, runValidators: true }
      );
      return deleteMessage;
    } catch (error) {
      console.error(`Message was not saved to db: ${error.message}`);
      throw new customErrorHandler(
        400,
        "Unable to send the mesage please try again..."
      );
    }
  }
  
}
