const jwt = require("jsonwebtoken");
const db = require("../models/index");
const User = db.user;
const Role = db.role;

const authenticate = async (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({ message: "Authentication required" });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const user = await User.findById(decodedToken.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

isAdmin = async (req, res, next) => {
  const roles = await Role.find({ _id: { $in: req.user.roles } });
  console.log(req.user.roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "admin") {
      next();
      return;
    }
  }
  res.status(403).send({ message: "Requre Admin Role!" });
};

isModerator = async (req, res, next) => {
  const roles = await Role.find({ _id: { $in: req.user.roles } });
  console.log(req.user.roles);
  for (let i = 0; i < roles.length; i++) {
    if (roles[i].name === "moderator") {
      next();
      return;
    }
  }
  res.status(403).send({ message: "Require Moderator Role!" });
};

module.exports = { authenticate, isAdmin, isModerator };
