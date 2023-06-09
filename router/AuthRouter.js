const authRouter = require("express").Router();
const isAuthenticated = require("../Middleware/AuthMiddleWare");
const {
  text,
  profile,
  signIn,
  Login,
  Logout,
} = require("./../controller/AuthController");

authRouter.post("/api/user/signin", signIn);

authRouter.get("/api/user/me", isAuthenticated, profile);

authRouter.post("/api/user/login", Login);

authRouter.get("/api/user/logout", Logout);

module.exports = authRouter;
