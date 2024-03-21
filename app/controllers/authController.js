const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const db = require("../models/index");
const User = db.user;
const Role = db.role;

// Register a new user
const register = async (req, res, next) => {
  const { username, email, password } = req.body;

  try {
    const role = await Role.findOne({ name: "user" });
    const user = new User({ username, email, password });
    user.roles = [role._id];

    await user.save();
    res.json({ message: "Registration successful" });
  } catch (error) {
    next(error);
  }
};

// Login with an existing user
const login = async (req, res, next) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordMatch = await user.comparePassword(password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Incorrect password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY, {
      expiresIn: "1 hour",
    });
    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
