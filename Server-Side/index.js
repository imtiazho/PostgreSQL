import express from "express";
import cors from "cors";
const app = express();
import todoRoutes from "./routes/todos.js";
import postRoutes from "./routes/Post.js";
import userRoutes from "./routes/User.js";

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send({ message: "Hello World" });
});

app.use("/todos", todoRoutes);
app.use("/posts", postRoutes);
app.use("/users", userRoutes);

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
