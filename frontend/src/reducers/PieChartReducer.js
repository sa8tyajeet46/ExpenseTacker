import { createReducer } from "@reduxjs/toolkit";

const initialState = {};
const pieReducer = createReducer(initialState, {
  PIEREQUEST: (state, action) => {
    state.loading = true;
    state.expense = null;
  },
  PIESUCCESS: (state, action) => {
    state.loading = false;
    state.expense = action.payload;
    state.error = null;
  },
  PIEFAIL: (state, action) => {
    state.loading = false;
    state.expense = null;
    state.error = action.payload;
  },
});

export default pieReducer;
