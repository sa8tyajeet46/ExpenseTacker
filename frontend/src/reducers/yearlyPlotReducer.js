import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const yearlyplotReducer = createReducer(initialState, {
  YPLOTREQUEST: (state, action) => {
    state.loading = true;
    state.expense = null;
  },
  YPLOTSUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload;
    state.error = null;
  },
  YPLOTFAIL: (state, action) => {
    state.loading = false;
    state.expense = null;
    state.error = action.payload;
  },
});

export default yearlyplotReducer;
