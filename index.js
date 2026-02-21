import express from "express";
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

// app.use((req, res, next) => {
//   const path = req.path;
//   if (path != "/users/1") {
//     res.json("Path not correct");
//   }
//   next();
// });

app.use("/users", userRoutes);
app.use("/posts", postRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on Port 3000");
});
