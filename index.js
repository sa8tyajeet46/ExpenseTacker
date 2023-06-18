const app = require("./app");

const dotenv = require("dotenv");
const connectDb = require("./connectDatabase");
// dotenv.config({ path: "./config/.env" });

app.listen(process.env.PORT, () => {
  console.log(`app is running at port ${process.env.PORT}`);
});

connectDb();
