const User = require("../models/User.Model");
const bcrypt = require("bcrypt");
const ObjectId = require("mongodb")
const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) {
      res.json({
        message: "User with this email already exists.",
        success: false,
      });
      return;
    }
    const hashpassword = await bcrypt.hash(password, 10);
    const user = new User({
      name,
      email,
      password: hashpassword,
    });
    await user.save();
    await res.json({
      status: 1,
      message: "successfully create ",
      success: true,
    });
  } catch (error) {
    res.json({
      message: "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const E_exists = await User.findOne({ email });
    if (!E_exists) {
      res.json({
        message: "No account found with this email. Please sign up first.",
        succuss: false,
      });
      return;
    }
    const P_exists = await bcrypt.compare(password, E_exists.password);
    if (!P_exists) {
      res.json({
        message: "Incorrect password. Please try again.",
        success: false,
      });
      return;
    }
    res.json({ message: "Login successful! Welcome back.", success: true });
  } catch (error) {
    res.json({
      message:
        error.message || "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};

const forgot = async (req, res) => {
  try {
    const { email } = req.body;
    const exists = await User.findOne({ email });
    if (!exists) {
      res.json({
        message:
          "No account found with this email. Please check and try again.",
        success: false,
      });
      return;
    }
    res.json({
      message:
        "A password reset link has been generated. Please check your email.",
      success: true,
    });
    const url = "http://localhost:8080/auth/user/reset/";
    console.log(url);
  } catch (error) {
    res.json({
      message:
        error.message || "Internal Server Error. Please try again later.",
      success: false,
    });
  }
};

const reset = async (req, res) => {
  try {
    const { password } = req.body;
    const { id } = req.params;
    console.log("-->" , password)

    const hashpassword = await bcrypt.hash(password , 10)
   
    const reset_ps = await User.updateOne(
      { _id: new ObjectId(id) },
      { $set: { password : hashpassword} }
    );
   
    res.json({message : "Password updated successfully!"   , success : true, reset_ps})
  } catch (error) {
    res.json({message : error.message || "Internal Server Error. Please try again later." , success : false})
  }
};

module.exports = { signup, login, forgot  , reset};
