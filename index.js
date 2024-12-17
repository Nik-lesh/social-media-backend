import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRoutes from "./src/features/user/user.routes.js";
import postRoutes from "./src/features/posts/post.routes.js";
import likeRoutes from "./src/features/likes/like.routes.js";
import commentRoutes from "./src/features/comments /comments.routes.js";
import cookieParser from "cookie-parser";
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use("/api/users", userRoutes);
app.use("/api/users/post", postRoutes);
app.use("/api/users/post", likeRoutes);
app.use("/api/users/post", commentRoutes);
export default app;
