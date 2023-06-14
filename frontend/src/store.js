import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import expenseReducer from "./reducers/expenseReducer";
import listReducer from "./reducers/listReducer";
import edExpReducer from "./reducers/editDelExpReducer";
import newExpense from "./reducers/newExpense";
import monthlyExpenseReducer from "./reducers/monthExpenseReducer";
import categoryReducer from "./reducers/categoryReducer";
import plotReducer from "./reducers/plotReducer";
import yearlyplotReducer from "./reducers/yearlyPlotReducer";
import pieReducer from "./reducers/PieChartReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
    list: listReducer,
    ed: edExpReducer,
    newexpense: newExpense,
    monthlyExpense: monthlyExpenseReducer,
    categoryExpense: categoryReducer,
    plot: plotReducer,
    yplot: yearlyplotReducer,
    pieplot: pieReducer,
  },
});

export default store;
