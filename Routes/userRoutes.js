import { Router } from "express";
import {
  getUser,
  getUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controller/userController.js";
const userRoutes = Router();

userRoutes.get("/", getUsers);

userRoutes.get("/:id", getUser);

userRoutes.post("/", createUser);

userRoutes.put("/:id", updateUser);

userRoutes.delete("/:id", deleteUser);

export default userRoutes;
