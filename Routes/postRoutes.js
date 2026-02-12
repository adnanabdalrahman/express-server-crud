import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";

import validate from "../middleware/validate.js";
import {
  getPostSchema,
  updatePostSchema,
  createPostSchema,
} from "../validators/postSchema.js";

const postRoutes = Router();

postRoutes.get("/", getPosts);

postRoutes.get("/:id", validate(getPostSchema), getPost);

postRoutes.post("/", validate(createPostSchema), createPost);

postRoutes.put("/:id", validate(updatePostSchema), updatePost);

postRoutes.delete("/:id", deletePost);

export default postRoutes;
