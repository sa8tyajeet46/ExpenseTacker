const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

const isAuthenticated = async (req, res, next) => {
  const { token } = req.cookies;
  // console.log(res.cookie);
  if (!token) {
    return res.status(404).json({ success: false, err: "Login to continue" });
  }

  const decodedData = await jwt.decode(token);

  const user = await User.findById(decodedData.id);

  req.user = user;

  return next();
};

module.exports = isAuthenticated;
