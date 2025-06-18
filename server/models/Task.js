// models/Task.js
const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  user: { type: String, required: true },
  title: { type: String, required: true },
  dueDate: { type: Date },
  status: { type: String, enum: ["pending", "completed"], default: "pending" },
  priority: { type: String, enum: ["low", "medium", "high"], default: "medium" },
  completed: {
  type: Boolean,
  default: false,
},
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);



