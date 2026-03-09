const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// ---------------- ROUTES ----------------

// test route
app.get("/", (req, res) => {
  res.send("🚀 Backend is running");
});

// launch storage (temporary memory)
let launchDate = new Date();

// GET launch
app.get("/launch", (req, res) => {
  res.json({ launchDate });
});

// POST launch
app.post("/launch", (req, res) => {
  const { date } = req.body;

  launchDate = new Date(date);

  res.json({
    message: "Launch updated",
    launchDate,
  });
});

// ---------------- SERVER ----------------

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});