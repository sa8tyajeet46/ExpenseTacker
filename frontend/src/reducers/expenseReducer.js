import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

const expenseReducer = createReducer(initialState, {
  ADDEXPENSEREQUEST: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  ADDEXPENSEFAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
  ADDEXPENSESUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload.expense;
    state.message = action.payload.message;
    state.error = null;
  },
  CLEARMESSAGE: (state, action) => {
    state.message = null;
  },
});
export default expenseReducer;
