import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/userReducer";
import expenseReducer from "./reducers/expenseReducer";
import listReducer from "./reducers/listReducer";

const store = configureStore({
  reducer: {
    user: userReducer,
    expense: expenseReducer,
    list: listReducer,
  },
});

export default store;
