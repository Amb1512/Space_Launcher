const getMission = (req, res) => {
  res.json({
    mission: {
      name: "Nebula Core",
      description: "Lunar exploration mission focused on habitat deployment and geological study.",
      destination: "Moon South Pole",
      duration: "30 days"
    }
  });
};

module.exports = { getMission };