import { customErrorHandler } from "../../middleware/errorHandling/error.handling.js";
import { getlikesByPostId, createLike, removeLike } from "./like.repository.js";

export const createLikeController = async (req, res) => {
  try {
    const userId = req.user._id;
    const postId = req.params.postId;
    const like = await createLike(postId, userId);

    res.status(201).json({ success: true, message: "Like created", like });
  } catch (error) {
    console.error(`Error creating like: ${error.message}`);
    throw new customErrorHandler(401, "Error creating like");
  }
};
export const getlikesByPostIdController = async (req, res) => {
  try {
    const posId = req.params.postId;
    const likes = await getlikesByPostId(posId);
    res.status(200).json({ success: true, message: "Likes fetched", likes });
  } catch (error) {
    console.error(`Error getting likes by post id: ${error.message}`);
    throw new customErrorHandler(401, "Error getting likes by post id");
  }
};

export const removeLikeController = async (req, res) => {
  try {
    const postId = req.params.postId;
    const userId = req.user._id;
    const deletedLike = await removeLike(postId, userId);
    res.status(200).json(deletedLike);
  } catch (error) {
    console.error(`Error deleting like: ${error.message}`);
    throw new customErrorHandler(401, "Error deleting like");
  }
};
