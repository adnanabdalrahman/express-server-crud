import express from "express";
import userRoutes from "./routes/userRoutes.js";
import postRoutes from "./routes/postRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import cors from "cors";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static("uploads"));
// app.use((req, res, next) => {
//   const path = req.path;
//   if (path != "/users/1") {
//     res.json("Path not correct");
//   }
//   next();
// });

app.use("/users", userRoutes);
app.use("/posts", postRoutes);
app.use("/auth", authRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on Port 3000");
});
