const isAuthenticated = require("../Middleware/AuthMiddleWare");
const {
  create,
  listExpenses,
  editExpense,
} = require("./../controller/expenseController");
const ExpenseRouter = require("express").Router();

ExpenseRouter.post("/api/exp/create", isAuthenticated, create);

ExpenseRouter.get("/api/exp/list", isAuthenticated, listExpenses);

ExpenseRouter.put("/api/exp/:id", isAuthenticated, editExpense);

module.exports = ExpenseRouter;
