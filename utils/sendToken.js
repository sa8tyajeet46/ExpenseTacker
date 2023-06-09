const sendToken = async (user, statusCode, res) => {
  const token = await user.getJsonWebtoken();
  const options = {
    httpOnly: true,
    // secure: true,
    expire: Date.now() + 24 * 60 * 60 * 1000,
  };
  res.status(statusCode).cookie("token", token, options).json({
    sucess: true,
    token,
    user,
  });
};

module.exports = { sendToken };
