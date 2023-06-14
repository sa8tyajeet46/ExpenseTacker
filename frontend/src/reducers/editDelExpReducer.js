import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const edExpReducer = createReducer(initialState, {
  EDITREQUEST: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  EDITSUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload.message;
    state.expense = action.payload.expense;
    state.error = null;
  },
  EDITFAIL: (state, action) => {
    state.loading = false;
    state.message = null;
    state.error = action.payload;
    state.expense = null;
  },
  DELETEREQUEST: (state, action) => {
    state.loading = true;
    state.error = null;
  },
  DELETEFAIL: (state, action) => {
    state.loading = false;
    state.message = null;
    state.error = action.payload;
  },
  DELETESUCCESS: (state, action) => {
    state.loading = false;
    state.message = action.payload;
    state.error = null;
  },
  CLEARMESSAGE: (state, action) => {
    state.message = null;
  },
});
export default edExpReducer;
