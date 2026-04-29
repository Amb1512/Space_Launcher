const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  getAllUsers,
  getUserById
} = require("../controllers/userController");

/* Auth Routes */
router.post("/signup", signup);
router.post("/login", login);

/* User Routes */
router.get("/", getAllUsers);
router.get("/:id", getUserById);

module.exports = router;