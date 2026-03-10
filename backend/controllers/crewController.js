const getCrew = (req, res) => {
  res.json({
    crew: [
      { name: "Col. Rachel Vasquez", designation: "Mission Commander" },
      { name: "Cmdr. James Kim", designation: "Pilot" },
      { name: "Dr. Sarah Nakamura", designation: "Mission Specialist" }
    ]
  });
};

module.exports = { getCrew };