import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";

import validate from "../middleware/validate.js";
import {
  getUserSchema,
  updateUserSchema,
  createUserSchema,
} from "../validators/userSchema.js";

const userRoutes = Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:id", validate(getUserSchema), getUser);

userRoutes.post("/", validate(createUserSchema), createUser);

userRoutes.put("/:id", validate(updateUserSchema), updateUser);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;
