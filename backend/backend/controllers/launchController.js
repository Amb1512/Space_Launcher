const getLaunch = (req, res) => {

  const launchDate = new Date("2026-06-15T10:30:00Z");
  const now = new Date();

  const diff = launchDate - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);



  
  res.json({
    launch: {
      date: launchDate.toISOString().split("T")[0],
      time: launchDate.toISOString().split("T")[1].split(".")[0] + " UTC",
      site: "Kennedy Space Center - Launch Complex 39B",
      vehicle: "Orion SLS Block 2",
      durationLeft: {
        days,
        hours,
        minutes,
        seconds
      }
    }
  });

};

module.exports = { getLaunch };