// controllers/journalController.js
const Journal = require("../models/Journal");

exports.createJournal = async (req, res) => {
  const { title, content, mood, tag, jtype } = req.body;
  const user = req.user.uid;
  const completed = req.body.completed || false

  try { 
    const journal = new Journal({ title, content, user, tag, mood, jtype });
    await journal.save();
    res.status(201).json(journal);
  } catch (err) {
    res.status(500).json({ message: "Failed to save journal", error: err });
  }
};

exports.getJournals = async (req, res) => {
  const user = req.user.uid;

  try {
    const journals = await Journal.find({ user }).sort({ createdAt: -1 });
    res.json(journals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch journals" });
  }
};


//new delete functionality
exports.deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);

    if (!journal) {
      return res.status(404).json({ message: "Journal entry not found" });
    }

    // Check if the logged-in user owns this journal
    if (journal.user !== req.user.uid) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await Journal.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Journal entry deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//Update journal functionality

exports.updateJournal = async (req, res) => {
  const { id } = req.params;
  const { title, content, mood, tag, jtype } = req.body;
  const user = req.user.uid;

  try {
    const journal = await Journal.findById(id);

    if (!journal) {
      return res.status(404).json({ message: "Journal not found" });
    }

    if (journal.user !== user) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    journal.title = title || journal.title;
    journal.content = content || journal.content;
    journal.mood = mood || journal.mood;
    journal.tag = tag || journal.tag;
    journal.jtype = jtype || journal.jtype;
    
    

    await journal.save();
    res.status(200).json(journal);
  } catch (err) {
    res.status(500).json({ message: "Failed to update journal", error: err });
  }
};

//completed task functionality
exports.toggleJournalCompletion = async (req, res) => {
  const { id } = req.params;
  const journal = await Journal.findById(id);
  journal.completed = !journal.completed;
  await journal.save();
  res.json(journal);
};

//Filter
exports.getAllJournals = async (req, res) => {
  const user = req.user.uid;
  const {
    title,
    content,
    mood,
    tag,
    jtype,
    date,      // ✅ specific date
      // ✅ recent time filter: 1, 7, 30
  } = req.query;

  try {
    let query = { user };

    // Optional Filters
    if (title) {
      query.title = { $regex: title, $options: "i" };
    }
    if (content) {
      query.content = { $regex: content, $options: "i" };
    }
    if (mood) {
      query.mood = mood;
    }
    if (tag) {
      query.tag = tag;
    }
    if (jtype) {
      query.jtype = jtype;
    }

    // 📆 Specific date filtering
    if (date) {
      const selectedDate = new Date(date);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      query.createdAt = { $gte: selectedDate, $lt: nextDay };
    }
    const journals = await Journal.find(query).sort({ createdAt: -1 });
    res.status(200).json(journals);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch journals", error: err });
  }
};

