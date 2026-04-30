import jwt from "jsonwebtoken";

const auth = (req, res, next) => {
  try {
    let token = req.headers.authorization;
    if (!token) {
      return res.status(401).json({ message: "No token provided" });
    }
    // Support for Bearer token
    if (token.startsWith("Bearer ")) {
      token = token.slice(7);
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid Token" });
  }
};

export default auth;