const express = require("express");
const router = express.Router();
const Assignment = require("../models/Assignment");

// Get all assignments
router.get("/", async (req, res) => {
  try {
    const assignments = await Assignment.find();
    res.json(assignments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new assignment
router.post("/", async (req, res) => {
  const { title, dueDate } = req.body;
  try {
    const newAssignment = new Assignment({ title, dueDate });
    await newAssignment.save();
    res.json(newAssignment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;