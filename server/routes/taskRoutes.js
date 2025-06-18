const express = require("express");
const router = express.Router();
const verifyToken = require("../firebase/verifyToken");
const {
  createTask,
  updateTask,
  getTasks,
  deleteTask,
  toggleTaskCompletion
} = require("../controllers/taskController");

router.post("/add", verifyToken, createTask);
router.put("/:id", verifyToken, updateTask);
router.get("/", verifyToken, getTasks);
router.delete("/:id", verifyToken, deleteTask);
router.patch("/toggle-complete/:id", toggleTaskCompletion);

module.exports = router;
