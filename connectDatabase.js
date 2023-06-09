const mongoose = require("mongoose");
const connectDb = () => {
  mongoose
    .connect(process.env.DB)
    .then(() => console.log("Database connected"))
    .catch((err) => {
      console.log(err);
    });
};

module.exports = connectDb;
