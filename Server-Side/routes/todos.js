import { Router } from "express";
import pool from "../db.js";

const router = Router();


// Create todos
router.post("/", async (req, res) => {
  try {
    const { description, completed } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description, completed) VALUES ($1, $2) RETURNING *",
      [description, completed || false],
    );

    res.send(newTodo.rows[0]);
  } catch (error) {
    res.status(500).send("Server Error");
  }
});


// Get all todos
router.get("/", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * FROM todo");
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});



router.put('/:id', async (req, res) => {

})

export default router;
