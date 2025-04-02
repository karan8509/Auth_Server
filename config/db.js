const mongoose = require("mongoose");
require("dotenv").config()
const connected = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MONGODB CONNECTED ON ");
  } catch (error) {
    console.log("MONGODB NOT CONNECTED ", error.message);
  }
};

module.exports = connected
