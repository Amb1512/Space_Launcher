const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/* SIGNUP */
const signup = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      password,
      agency,
      rank
    } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      agency,
      rank
    });

    res.status(201).json({
      message: "Signup successful",
      user: {
        id: newUser._id,
        email: newUser.email
      }
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* LOGIN */
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid password"
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET ALL USERS */
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    res.status(200).json(users);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

/* GET USER BY ID */
const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json(user);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

module.exports = {
  signup,
  login,
  getAllUsers,
  getUserById
};