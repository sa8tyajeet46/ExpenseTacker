const mongoose = require("mongoose");
const { boolean } = require("webidl-conversions");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    trim: true,
    minLength: [5, "Name should at least 5 charchter long"],
    required: "Name is required",
  },
  email: {
    type: String,
    trim: true,
    unique: "Email already exists",
    match: [/.+\@.+\..+/, "Please fill a valid email address"],
    required: "Email is required",
  },
  created: {
    type: Date,
    default: Date.now,
  },
  password: {
    type: String,
    required: "Password is required",
    minLength: [8, "password should be 8 char long"],
  },
  verified: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.matchPassword = async function (userPassword) {
  const match = await bcrypt.compare(userPassword, this.password);
  return match;
};

userSchema.methods.getJsonWebtoken = async function () {
  return await jwt.sign({ id: this._id }, process.env.JWTS, {
    expiresIn: process.env.JWTE,
  });
};
module.exports = mongoose.model("User", userSchema);
