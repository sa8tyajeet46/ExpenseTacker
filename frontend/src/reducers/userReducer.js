import { createReducer } from "@reduxjs/toolkit";
const initialState = {};
const userReducer = createReducer(initialState, {
  LOADUSER: (state, action) => {
    state.loading = true;
    state.error = null;
    state.user = null;
    state.auth = false;
  },
  LOADUSERFAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.user = null;
    state.auth = false;
  },
  LOADUSERSUCCESS: (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload;
    state.auth = true;
  },
  SIGNUSER: (state, action) => {
    state.loading = true;
    state.error = null;
    state.user = null;
    state.auth = false;
  },
  SIGNUSERFAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.user = null;
    state.auth = false;
  },
  SIGNUSERSUCCESS: (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload;
    state.auth = true;
  },
  RESETUSER: (state, action) => {
    state.loading = true;
    state.error = null;
    state.user = null;
    state.auth = false;
  },
  RESETUSERFAIL: (state, action) => {
    state.loading = false;
    state.error = action.payload;
    state.user = null;
    state.auth = false;
  },
  RESETUSERSUCCESS: (state, action) => {
    state.loading = false;
    state.error = null;
    state.user = action.payload;
    state.auth = true;
  },
  LOGOUTREQUEST: (state, action) => {
    state.loading = true;
  },
  LOGOUTSUCCESS: (state, action) => {
    state.loading = false;
    state.user = null;
    state.auth = false;
  },
  CLEARERROR: (state) => {
    state.error = null;
  },
});
export default userReducer;
