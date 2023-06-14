import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const newExpense = createReducer(initialState, {
  NEWEXPREQUEST: (state, action) => {
    state.loading = true;
    state.error = false;
    state.expense = null;
  },
  NEWEXPFAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.expense = null;
  },
  NEWEXPSUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload;
    state.error = null;
  },
});

export default newExpense;
