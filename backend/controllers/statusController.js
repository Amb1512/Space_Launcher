const getStatus = (req, res) => {
  res.json({
    status: {
      missionStatus: "Nominal",
      lifeSupport: "Operational",
      navigation: "Stable",
      communication: "Active",
      lastUpdate: new Date().toISOString()
    }
  });
};

module.exports = { getStatus };