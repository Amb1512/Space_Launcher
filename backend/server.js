const express = require("express");
const cors = require("cors");
require("dotenv").config();

const missionRoutes = require("./routes/missionRoutes");
const crewRoutes = require("./routes/crewRoutes");
const launchRoutes = require("./routes/launchRoutes");
const logsRoutes = require("./routes/logsRoutes");
const statusRoutes = require("./routes/statusRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/mission", missionRoutes);
app.use("/crew", crewRoutes);
app.use("/launch", launchRoutes);
app.use("/logs", logsRoutes);
app.use("/status", statusRoutes);

app.listen(5000, () => {
  console.log("🚀 Server running on http://localhost:5000");
});