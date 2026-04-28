const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

const connectDB = require("./database/db");
const crewRoutes = require("./routes/crewRoutes");

app.use(cors());
app.use(express.json());

app.use("/crew", crewRoutes);

const PORT = 5000;

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log("🚀 Server Running");
  });
};

startServer();