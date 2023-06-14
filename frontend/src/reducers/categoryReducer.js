import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const categoryReducer = createReducer(initialState, {
  CEREQUEST: (state, action) => {
    state.loading = true;
    state.expense = null;
  },
  CESUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload;
    state.error = null;
  },
  CEFAIL: (state, action) => {
    state.loading = false;
    state.expense = null;
    state.error = action.payload;
  },
});

export default categoryReducer;
