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
import auth from "../middleware/auth.js";

const postRoutes = Router();

postRoutes.post(
  "/",
  auth,
  upload.single("image"),
  validate(createPostSchema),
  createPost,
);
postRoutes.put(
  "/:id",
  auth,
  upload.single("image"),
  validate(updatePostSchema),
  updatePost,
);
postRoutes.get("/", getPosts);

postRoutes.get("/:id", validate(getPostSchema), getPost);

postRoutes.delete("/:id", auth, deletePost);

export default postRoutes;
