const Task = require("../models/Task");

exports.createTask = async (req, res) => {
  const { title, dueDate, priority } = req.body;
  const user = req.user.uid;
  const completed = req.body.completed || false
  

  try {
    const task = new Task({ title, dueDate, priority, user});
    await task.save();
    res.status(201).json(task);
  } catch (err) {
    res.status(500).json({ message: "Failed to create task", error: err });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    if (task.user !== req.user.uid) return res.status(403).json({ message: "Unauthorized" });

    const updated = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to update task", error: err });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.uid }).sort({ createdAt: -1 });
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch tasks", error: err });
  }
};

//delete tasks
exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ message: "Task not found" });
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting task", error: err });
  }
};

//completed entries functionality
  exports.toggleTaskCompletion = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById(id);
  task.completed = !task.completed;
  await task.save();
  res.json(task);
};

