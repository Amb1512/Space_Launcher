const mongoose = require("mongoose");

const crewSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  designation: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model("Crew", crewSchema);