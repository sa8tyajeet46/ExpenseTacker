const express = require("express");
const bodyparser = require("body-parser");
const cookieparser = require("cookie-parser");
const cors = require("cors");
const compression = require("compression");
const helmet = require("helmet");
const authRouter = require("./router/AuthRouter");
const errorMiddleware = require("./Middleware/error");
const ExpenseRouter = require("./router/ExpenseRouter");

const app = express();
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({ extended: true }));
app.use(cookieparser());
app.use(compression());
app.use(helmet());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(errorMiddleware);
app.use(authRouter);
app.use(ExpenseRouter);
module.exports = app;
