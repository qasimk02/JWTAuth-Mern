const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./app/models/index");
const authRoutes = require("./app/routes/auth");
const userRoutes = require("./app/routes/user");
const adminRoutes = require("./app/routes/admin");
const moderatorRoutes = require("./app/routes/moderator");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

//connect to DB
db.connectDB();

//ROUTES
// test route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to my application." });
});

// Define authentication routes
app.use("/auth", authRoutes);

// Define user routes
app.use("/user", userRoutes);

//Define admin rotes
app.use("/admin", adminRoutes);

//Derfine moderator routes
app.use("/moderator", moderatorRoutes);

// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
