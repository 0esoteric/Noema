// routes/journalRoutes.js
const express = require("express");
const router = express.Router();
const { createJournal, getJournals, deleteJournal, updateJournal, toggleJournalCompletion } = require("../controllers/journalController");
const verifyToken = require("../firebase/verifyToken");

router.post("/add", verifyToken, createJournal);
router.get("/", verifyToken, getJournals);
router.delete("/:id", verifyToken, deleteJournal);
router.put("/:id", verifyToken, updateJournal);
router.patch("/toggle-complete/:id", toggleJournalCompletion);



module.exports = router;


