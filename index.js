import express from "express";
import userRoutes from "./Routes/userRoutes.js";
const app = express();
app.use(express.json());

app.use("/users", userRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log("Server is running on Port 3000");
});
