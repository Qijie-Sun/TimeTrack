const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  startTime: { type: String, required: true },
  days: { type: [String], required: true },
});

module.exports = mongoose.model("Course", courseSchema);