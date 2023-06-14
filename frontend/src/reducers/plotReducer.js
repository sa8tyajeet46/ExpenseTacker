import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const plotReducer = createReducer(initialState, {
  PLOTREQUEST: (state, action) => {
    state.loading = true;
    state.expense = null;
  },
  PLOTSUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload;
    state.error = null;
  },
  PLOTFAIL: (state, action) => {
    state.loading = false;
    state.expense = null;
    state.error = action.payload;
  },
});

export default plotReducer;
