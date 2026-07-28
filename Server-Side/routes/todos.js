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

export default router;
