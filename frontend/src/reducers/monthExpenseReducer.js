import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const monthlyExpenseReducer = createReducer(initialState, {
  MEREQUEST: (state, action) => {
    state.loading = true;
    state.expense = null;
  },
  MESUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload;
    state.error = null;
  },
  MEFAIL: (state, action) => {
    state.loading = false;
    state.expense = null;
    state.error = action.payload;
  },
});

export default monthlyExpenseReducer;
