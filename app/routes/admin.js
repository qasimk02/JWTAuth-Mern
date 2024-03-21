const express = require("express");
const { authenticate, isAdmin } = require("../middlewares/authJwt");
const db = require("../models/index");
const router = express.Router();

router.get("/profile", authenticate, isAdmin, (req, res) => {
  res.json(req.user);
});

module.exports = router;
