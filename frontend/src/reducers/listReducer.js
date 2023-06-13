import { createReducer } from "@reduxjs/toolkit";

const initialState = {};

const listReducer = createReducer(initialState, {
  LISTREQUEST: (state, action) => {
    state.loading = true;
    state.error = false;
  },
  LISTSUCCESS: (state, action) => {
    state.loading = false;
    state.error = false;
    state.expenses = action.payload;
  },
  LISTFAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
  },
});
export default listReducer;
