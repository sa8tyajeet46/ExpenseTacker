module.exports = (err) => {
  const error = err.message || "Internal Server Error";
  return error;
};
