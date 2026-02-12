import express from "express";
import userRoutes from "./Routes/userRoutes.js";

const app = express();
app.use(express.json());

// app.use((req, res, next) => {
//   const path = req.path;
//   if (path != "/users/1") {
//     res.json("Path not correct");
//   }
//   next();
// });



app.use("/users", userRoutes);
app.use("/products", userRoutes);




const PORT = 3001;
app.listen(PORT, () => {
  console.log("Server is running on Port 3001");
});
