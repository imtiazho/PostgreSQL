import express from "express";
import cors from "cors";
const app = express();
import todoRoutes from "./routes/todos.js";

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.use('/todos', todoRoutes);

app.listen(5000, () => {
    console.log("Server is running on port 5000");
})