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
import categoryExpense from "../actions/categoryExpense";
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
      <AppBar position="static" sx={{ backgroundColor: "#9c27b0" }}>
        <Toolbar
          variant="dense"
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box>
            <Typography variant="h5">Expense Tracker</Typography>
          </Box>
          <Box sx={{ display: "flex" }}>
            <Box
              sx={{
                width: 170,
                backgroundColor: "white",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Link
                to="/add/expense"
                style={{ textDecoration: "none", display: "flex" }}
              >
                <Add sx={{ width: 35, color: "green" }}></Add>
                <Typography color="green">ADD EXPENSE</Typography>
              </Link>
            </Box>

            <Button sx={{ color: "#fff" }} onClick={(e) => handleLogout(e)}>
              <LogogoutIcon></LogogoutIcon>Logout
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <Link to="/all/expense">List Expenses</Link>
      <Link to="/expense/report/monthly">Month Report</Link>
      <Link to="/expense/report/graph">Graph Report</Link>
      <Link to="/expense/report/yearPlot">Yearly plot</Link>
      <Link to="/expense/report/piePlot">Pie plot</Link>

      {expense &&
        expense.map((list) => {
          return (
            <div>
              <div>{list._id}</div>
              <div>average - {list.mergedValues.average}</div>
              <div>thisMonth - {list.mergedValues.total}</div>
              {list.mergedValues.average - list.mergedValues.total >= 0 ? (
                <div>
                  saved {list.mergedValues.average - list.mergedValues.total}
                </div>
              ) : (
                <div>
                  Loss {list.mergedValues.average - list.mergedValues.total}
                </div>
              )}
            </div>
          );
        })}
    </div>
  );
}

export default Home;
