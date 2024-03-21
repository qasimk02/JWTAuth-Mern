const mongoose = require("mongoose");
// mongoose.Promise = global.Promise;
require("dotenv").config();

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
    initial();
  } catch (error) {
    console.log("Error connecting to MongoDB:", error);
    process.exit();
  }
};

//creating roles just after connection setup
const Role = db.role;
async function initial() {
  try {
    const count = await Role.estimatedDocumentCount();
    if (count === 0) {
      await Promise.all([
        new Role({ name: "user" }).save(),
        new Role({ name: "moderator" }).save(),
        new Role({ name: "admin" }).save(),
      ]);
      console.log("Roles added successfully.");
    }
  } catch (err) {
    console.error("Error initializing roles:", err);
  }
}

db.ROLES = ["user", "admin", "moderator"];
db.connectDB = connectDB;

module.exports = db;
