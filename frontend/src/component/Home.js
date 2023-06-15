import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import logout from "../actions/logout";
import { useNavigate } from "react-router-dom";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Add from "@mui/icons-material/Add";
import LogogoutIcon from "@mui/icons-material/Logout";
import { useSelector } from "react-redux";
import { useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Header from "./Header";
import categoryExpense from "../actions/categoryExpense";
import AverageExpenseCard from "./AverageExpenseCard";
function Home() {
  const { error, message } = useSelector((state) => state.ed);
  const [err, setErr] = useState({ open: false, msg: "" });
  const [suc, setSuc] = useState({ open: false, msg: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { expense } = useSelector((state) => state.categoryExpense);
  useEffect(() => {
    if (error) {
      setErr({ open: true, msg: error });
      dispatch({ type: "CLEARERROR" });
    }
    if (message) {
      setSuc({ open: true, msg: message });
      dispatch({ type: "CLEARMESSAGE" });
    }
    dispatch(categoryExpense());
  }, [error, message]);
  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };
  return (
    <div>
      <Header></Header>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "horizontal" }}
        open={err.open}
        autoHideDuration={5000}
        onClose={() => setErr({ ...err, open: false })}
      >
        <Alert severity="error">{err.msg}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "horizontal" }}
        open={suc.open}
        autoHideDuration={5000}
        onClose={() => setSuc({ ...suc, open: false })}
      >
        <Alert severity="success">{suc.msg}</Alert>
      </Snackbar>
      <div className="w-full flex flex-col items-center">
        {expense &&
          expense.map((list, i) => {
            return <AverageExpenseCard {...list} key={i}></AverageExpenseCard>;
          })}
      </div>
    </div>
  );
}

export default Home;
