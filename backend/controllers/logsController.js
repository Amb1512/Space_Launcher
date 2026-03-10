const getLogs = (req, res) => {
  res.json({
    logs: [
      {
        type: "milestone",
        title: "Lunar Habitat Module Deployed",
        date: "2026-02-14",
        author: "Flight Director M. Okonkwo"
      },
      {
        type: "nominal",
        title: "Geological Samples Collected",
        date: "2026-02-12",
        author: "EVA Controller T. Harrison"
      },
      {
        type: "critical",
        title: "Oxygen Regulator Anomaly Detected",
        date: "2026-02-10",
        author: "Systems Engineer A. Patel"
      }
    ]
  });
};

module.exports = { getLogs };