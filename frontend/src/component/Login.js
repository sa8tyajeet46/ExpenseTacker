import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import loaduser from "../actions/loadUser";
import { Link } from "react-router-dom";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
import "./login.css";
function Login() {
  const [userData, setUserData] = useState({ email: "", password: "" });
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  const loginUser = (e) => {
    e.preventDefault();
    dispatch(loaduser(userData.email, userData.password));
  };
  useEffect(() => {
    if (error) {
      setOpen(() => true);
      setErr(() => error);
      dispatch({ type: "CLEARERROR" });
    }
  }, [error]);
  return (
    <div className="mainDiv">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "horizontal" }}
        open={open}
        autoHideDuration={5000}
        onClose={() => setOpen(false)}
      >
        <Alert severity="error">{err}</Alert>
      </Snackbar>

      <form onSubmit={(e) => loginUser(e)} className="container">
        <h1 className="mlk">Login</h1>
        <TextField
          type="email"
          label="Email"
          placeholder="Enter Email"
          value={userData.email}
          variant="standard"
          fullWidth
          focused
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
        ></TextField>
        <TextField
          type="password"
          label="password"
          placeholder="Enter password"
          value={userData.password}
          color="primary"
          variant="standard"
          focused
          fullWidth
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
        ></TextField>

        <Button variant="contained" disabled={loading} type="submit">
          submit
        </Button>
      </form>
      <div>
        Don't have an account ?{" "}
        <Link className="ptu" to="/sign">
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
