const express = require("express");
const { authenticate, isModerator } = require("../middlewares/authJwt");
const db = require("../models/index");
const router = express.Router();

router.get("/profile", authenticate, isModerator, (req, res) => {
  res.json(req.user);
});

module.exports = router;
