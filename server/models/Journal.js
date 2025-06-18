// models/Journal.js
const mongoose = require("mongoose");

const journalSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true },
    content: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    mood: { type: String, enum: ["happy", "sad", "calm", "angry"], default: "calm" },
    tag: { type: String },
    jtype: { type: String, enum: ["personal", "work"], default: "personal" },
    completed: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Journal", journalSchema);
