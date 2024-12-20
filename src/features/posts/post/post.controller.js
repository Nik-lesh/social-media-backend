import { postRepository } from "./post.repository.js";

export const postController = async (req, res) => {
  try {
    const post = await postRepository(req.params.postId);
    res.status(200).json({ success: true, res: post });
  } catch (error) {
    console.error(`Error getting post: ${error.message}`);
    throw new customErrorHandler(400, "Unable to get post");
  }
};
