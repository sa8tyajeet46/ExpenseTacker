import React, { useEffect } from "react";
import { useState } from "react";
import "./login.css";
import { TextField, Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import addExpense from "../actions/addExpense";
import { Snackbar, Alert } from "@mui/material";
function AddExpense() {
  const [expense, setExpense] = useState({
    title: "",
    amount: null,
    category: "",
    notes: "",
    incurred_on: null,
  });
  const [err, setErr] = useState({ errmessage: "", open: false });
  const [msg, setMsg] = useState({ message: "", open: false });

  const dispatch = useDispatch();
  const {
    loading,
    expense: newExpense,
    message,
    error,
  } = useSelector((state) => state.expense);
  const handleChange = (value) => {
    setExpense({ ...expense, incurred_on: format(value.$d, "yyyy-MM-dd") });
  };
  useEffect(() => {
    if (error) {
      setErr({ errmessage: error, open: true });
      dispatch({ type: "CLEARERROR" });
    }
    if (message) {
      setMsg({ message: message, open: true });
      dispatch({ type: "CLEARMESSAGE" });
    }
  }, [error, message]);
  const handleSumbit = (e) => {
    e.preventDefault();
    dispatch(
      addExpense(
        expense.title,
        expense.amount,
        expense.category,
        expense.notes,
        expense.incurred_on
      )
    );
  };
  return (
    <div className="mainDiv">
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "horizontal" }}
        open={err.open}
        autoHideDuration={5000}
        onClose={() => setErr({ ...err, open: false })}
      >
        <Alert severity="error">{err.errmessage}</Alert>
      </Snackbar>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "horizontal" }}
        open={msg.open}
        autoHideDuration={5000}
        onClose={() => setMsg({ ...msg, open: false })}
      >
        <Alert severity="success">{msg.message}</Alert>
      </Snackbar>
      <form onSubmit={(e) => handleSumbit(e)} className="container">
        <h1 className="mlk">Add Expense</h1>
        <TextField
          type="text"
          label="Category"
          placeholder="Enter Category"
          value={expense.category}
          variant="standard"
          fullWidth
          focused
          onChange={(e) => setExpense({ ...expense, category: e.target.value })}
        ></TextField>
        <TextField
          type="text"
          label="Title"
          placeholder="Enter Title"
          value={expense.title}
          variant="standard"
          fullWidth
          focused
          onChange={(e) => setExpense({ ...expense, title: e.target.value })}
        ></TextField>
        <TextField
          type="text"
          label="Notes"
          placeholder="Enter Notes"
          value={expense.notes}
          variant="standard"
          fullWidth
          focused
          onChange={(e) => setExpense({ ...expense, notes: e.target.value })}
        ></TextField>
        <TextField
          type="Number"
          label="Amount in Rs"
          placeholder="Enter Amount"
          value={expense.amount}
          variant="standard"
          fullWidth
          focused
          onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
        ></TextField>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Incurred on"
            sx={{ width: "100%" }}
            value={expense.incurred_on}
            onChange={(value) => handleChange(value)}
            focused
          />
        </LocalizationProvider>

        <Button variant="contained" type="submit" disabled={loading}>
          submit
        </Button>
      </form>
    </div>
  );
}

export default AddExpense;
