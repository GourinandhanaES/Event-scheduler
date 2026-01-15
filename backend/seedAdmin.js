const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Admin = require("./src/models/Admin");

dotenv.config();

mongoose.connect(process.env.MONGO_URI);

const seedAdmin = async () => {
  try {
    const exists = await Admin.findOne({ username: "admin" });
    if (exists) {
      console.log("Admin already exists");
      process.exit();
    }

    await Admin.create({
      username: "admin",
      password: "admin123",
    });

    console.log("Admin created successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedAdmin();
