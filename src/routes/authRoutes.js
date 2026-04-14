import { Router } from "express";
import { login, profile, register } from "../controller/authController.js";
import auth from "../middleware/auth.js";

const authRoutes = Router();

authRoutes.post("/register", register);
authRoutes.post("/login", login);
authRoutes.get("/profile/me", auth, profile);

export default authRoutes;
