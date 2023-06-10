const gem = require("./../utils/giveErrorMessage");

const { sendToken } = require("../utils/sendToken");
const User = require("./../models/userModel");
const text = async (req, res, next) => {
  const hello = "hello world";
  res.json({ hello });
};

const signIn = async (req, res, next) => {
  try {
    const existinguser = await User.findOne({ email: req.body.email });
    if (existinguser) {
      return res
        .status(400)
        .json({ success: false, err: "user already exists" });
    }
    const user = await User.create({ ...req.body });

    sendToken(user, 201, res);
  } catch (err) {
    return res.status(500).json({ success: false, err: gem(err) });
  }
};

const profile = async (req, res, next) => {
  res.status(200).json({ success: true, user: req.user });
};

const Login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    //console.log("t");
    if (!user) {
      return res
        .status(400)
        .json({ success: false, err: "user doesn't exists" });
    }
    const pass = await user.matchPassword(password);
    if (!pass) {
      return res
        .status(400)
        .json({ success: false, err: "Invalid credentials" });
    }

    sendToken(user, 200, res);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ success: false, err: gem(err) });
  }
};
const Logout = async (req, res, next) => {
  const options = {
    httpOnly: true,
    // secure: true,
    expires: new Date(Date.now()),
  };
  res
    .cookie("token", null, options)
    .status(200)
    .json({ success: true, message: "Logged out successfully" });
};

module.exports = { text, signIn, profile, Login, Logout };
