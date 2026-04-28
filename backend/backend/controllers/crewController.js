const Crew = require("../models/Crew");

const getCrew = async (req, res) => {
  try {
    const data = await Crew.find();
    res.json({ crew: data });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error fetching crew" });
  }
};

module.exports = { getCrew };