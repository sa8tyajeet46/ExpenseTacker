import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import signuser from "../actions/signuser";
import { Link } from "react-router-dom";
import "./login.css";
import { TextField, Button, Snackbar, Alert } from "@mui/material";
function Sign() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [open, setOpen] = useState(false);
  const [err, setErr] = useState("");
  const dispatch = useDispatch();
  const { error, loading } = useSelector((state) => state.user);
  useEffect(() => {
    if (error) {
      setOpen(() => true);
      setErr(() => error);
      dispatch({ type: "CLEARERROR" });
    }
  }, [error]);
  const signinUser = (e) => {
    // e.preventDefault();
    // console.log(e);
    e.preventDefault();
    dispatch(signuser(userData.email, userData.password, userData.name));
  };
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
      <form onSubmit={(e) => signinUser(e)} className="container">
        <h1 className="mlk">SignUp</h1>

        <TextField
          type="text"
          placeholder="Enter name"
          value={userData.name}
          onChange={(e) => setUserData({ ...userData, name: e.target.value })}
          variant="standard"
          fullWidth
          focused
          label="Name"
        ></TextField>
        <TextField
          type="email"
          placeholder="Enter Email"
          value={userData.email}
          onChange={(e) => setUserData({ ...userData, email: e.target.value })}
          variant="standard"
          fullWidth
          focused
          label="Email"
        ></TextField>
        <TextField
          type="password"
          placeholder="Enter password"
          value={userData.password}
          onChange={(e) =>
            setUserData({ ...userData, password: e.target.value })
          }
          variant="standard"
          fullWidth
          focused
          label="Password"
        ></TextField>

        <Button type="submit" disabled={loading} variant="contained">
          submit
        </Button>
      </form>
      <div>
        Have an account ?{" "}
        <Link className="ptu" to="/">
          Login
        </Link>
      </div>
    </div>
  );
}

export default Sign;
