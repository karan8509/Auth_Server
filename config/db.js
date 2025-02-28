const mongoose = require("mongoose");
const connected = async () => {
  try {
    await mongoose.connect(process.env.DBURL);
    console.log("MONGODB CONNECTED ON ");
  } catch (error) {
    console.log("MONGODB NOT CONNECTED ", error.message);
  }
};

module.exports = connected
