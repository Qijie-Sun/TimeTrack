const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const assignmentsRoute = require("./routes/assignments");
const coursesRoute = require("./routes/courses");

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/assignments", assignmentsRoute);
app.use("/api/courses", coursesRoute);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log("Error connecting to MongoDB:", err));

// Start server
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});