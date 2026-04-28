const auth = (req, res, next) => {
  const token = req.headers.authorization;

  if (token === "mission123") {
    next();
  } else {
    res.status(401).json({ message: "Unauthorized Access" });
  }
};

module.exports = auth;