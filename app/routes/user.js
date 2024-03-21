const express = require("express");
const { authenticate } = require("../middlewares/authJwt");
const db = require("../models/index");
const Role = db.role;
const router = express.Router();

router.get("/profile", authenticate, (req, res) => {
  res.json(req.user);
});

module.exports = router;
