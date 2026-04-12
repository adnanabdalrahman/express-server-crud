import { Router } from "express";
import {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
} from "../controller/postController.js";
import { upload } from "../middleware/upload.js";
import validate from "../middleware/validate.js";
import {
  getPostSchema,
  updatePostSchema,
  createPostSchema,
} from "../validators/postSchema.js";

const postRoutes = Router();

postRoutes.get("/", getPosts);

postRoutes.get("/:id", validate(getPostSchema), getPost);

postRoutes.post(
  "/",
  upload.single("image"),
  validate(createPostSchema),
  createPost,
);

postRoutes.put(
  "/:id",
  upload.single("image"),
  validate(updatePostSchema),
  updatePost,
);

postRoutes.delete("/:id", deletePost);

export default postRoutes;
