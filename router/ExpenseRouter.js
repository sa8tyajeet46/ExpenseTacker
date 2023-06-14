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
  getExpense,
} = require("./../controller/expenseController");
const ExpenseRouter = require("express").Router();

ExpenseRouter.post("/api/exp/create", isAuthenticated, create);

ExpenseRouter.get("/api/exp/list", isAuthenticated, listExpenses);

ExpenseRouter.put("/api/exp/:id", isAuthenticated, editExpense);

ExpenseRouter.get("/api/exp/:id", isAuthenticated, getExpense);

ExpenseRouter.delete("/api/exp/:id", isAuthenticated, deleteExpense);

ExpenseRouter.get("/api/expReport/month", isAuthenticated, monthlyExpense);

ExpenseRouter.get(
  "/api/expReport/category",
  isAuthenticated,
  expenseByCategory
);

ExpenseRouter.get("/api/expReport/plot", isAuthenticated, plotExpenses);

ExpenseRouter.get("/api/expReport/graph", isAuthenticated, yearlyExpenses);

ExpenseRouter.get(
  "/api/expReport/avg/category",
  isAuthenticated,
  averageCategories
);

module.exports = ExpenseRouter;
