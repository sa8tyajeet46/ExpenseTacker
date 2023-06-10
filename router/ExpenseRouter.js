const isAuthenticated = require("../Middleware/AuthMiddleWare");
const {
  create,
  listExpenses,
  editExpense,
  deleteExpense,
  monthlyExpense,
  expenseByCategory,
  plotExpenses,
  yearlyExpenses,
  averageCategories,
} = require("./../controller/expenseController");
const ExpenseRouter = require("express").Router();

ExpenseRouter.post("/api/exp/create", isAuthenticated, create);

ExpenseRouter.get("/api/exp/list", isAuthenticated, listExpenses);

ExpenseRouter.put("/api/exp/:id", isAuthenticated, editExpense);

ExpenseRouter.delete("/api/exp/:id", isAuthenticated, deleteExpense);

ExpenseRouter.get("/api/exp/month", isAuthenticated, monthlyExpense);

ExpenseRouter.get("/api/exp/category", isAuthenticated, expenseByCategory);

ExpenseRouter.get("/api/exp/plot", isAuthenticated, plotExpenses);

ExpenseRouter.get("/api/exp/graph", isAuthenticated, yearlyExpenses);

ExpenseRouter.get("/api/exp/avg/category", isAuthenticated, averageCategories);

module.exports = ExpenseRouter;
