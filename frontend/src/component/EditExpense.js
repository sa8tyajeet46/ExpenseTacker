import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import getExpense from "../actions/nExpense";
import editExpense from "../actions/editExpense";
import { Snackbar, Alert } from "@mui/material";
import deleteExpense from "../actions/deleteExpense";
import Header from "./Header";
function EditExpense() {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [expense, setExpense] = useState({});
  const { expense: exp } = useSelector((state) => state.newexpense);
  const { error, message, loading } = useSelector((state) => state.ed);
  const [err, setErr] = useState({ open: false, msg: "" });
  const [suc, setSuc] = useState({ open: false, msg: "" });
  useEffect(() => {
    if (error) {
      setErr({ open: true, msg: error });
      dispatch({ type: "CLEARERROR" });
    }
    if (message) {
      setSuc({ open: true, msg: message });
      dispatch({ type: "CLEARMESSAGE" });
    }
    dispatch(getExpense(id));
    //expenses && setExpense({ ...data });
  }, [dispatch, id, error, message]);
  useEffect(() => {
    // dispatch(getExpense(id));
    //expenses && setExpense({ ...data });

    if (exp) {
      setExpense({ ...exp });
    }
  }, [exp]);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editExpense(id, { ...expense }));
  };
  const handleDelete = async () => {
    const con = window.confirm("Do  you want to delete the expense");
    if (con) {
      await dispatch(deleteExpense(id));
      navigate("/");
    }
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
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full flex flex-col justify-center items-center py-5 space-y-10"
      >
        <div className="w-full flex justify-center space-x-4">
          <TextField
            value={expense.title}
            onChange={(e) => setExpense({ ...expense, title: e.target.value })}
            variant="standard"
            focused
            label="Title"
            sx={{ width: "40%" }}
          ></TextField>
          <TextField
            value={expense.category}
            onChange={(e) =>
              setExpense({ ...expense, category: e.target.value })
            }
            variant="standard"
            focused
            label="Category"
            sx={{ width: "40%" }}
          ></TextField>
        </div>
        <div className="w-full flex justify-center space-x-4">
          <TextField
            value={expense.notes}
            onChange={(e) => setExpense({ ...expense, notes: e.target.value })}
            variant="standard"
            focused
            label="Notes"
            sx={{ width: "40%" }}
          ></TextField>
          <TextField
            value={expense.amount}
            type="number"
            onChange={(e) => setExpense({ ...expense, amount: e.target.value })}
            variant="standard"
            focused
            label="Amount"
            sx={{ width: "40%" }}
          ></TextField>
        </div>
        <div className="w-full flex justify-center space-x-4">
          <button
            disabled={loading}
            type="submit"
            className="flex justify-center items-center w-[40%] bg-green-700 text-gray-100 p-2 rounded-md"
          >
            Edit
          </button>
          <button
            onClick={() => handleDelete()}
            className="flex justify-center items-center w-[40%] bg-red-700 text-gray-100 p-2 rounded-md"
          >
            Delete
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditExpense;
