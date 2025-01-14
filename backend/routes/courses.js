const express = require("express");
const router = express.Router();
const Course = require("../models/Course");

// Get all courses
router.get("/", async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Add a new course
router.post("/", async (req, res) => {
  const { title, startTime, days } = req.body;
  try {
    const newCourse = new Course({ title, startTime, days });
    await newCourse.save();
    res.json(newCourse);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;