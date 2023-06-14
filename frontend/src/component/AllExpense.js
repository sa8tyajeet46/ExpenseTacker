import React, { useEffect } from "react";
import { useState } from "react";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import format from "date-fns/format";
import { Button } from "@mui/material";
import "./allExpense.css";
import { useDispatch, useSelector } from "react-redux";
import listExpenses from "../actions/listExpense";
import ExpenseCard from "./ExpenseCard";
function AllExpense() {
  const [range, setRange] = useState({ firstDay: null, lastDay: null });
  const dispatch = useDispatch();
  const handleChange = (value, x) => {
    if (x === 1) {
      setRange({ ...range, firstDay: format(value.$d, "yyyy-MM-dd") });
    }
    if (x == 2) {
      setRange({ ...range, lastDay: format(value.$d, "yyyy-MM-dd") });
    }
  };
  useEffect(() => {}, [dispatch]);
  const { loading, error, expenses } = useSelector((state) => state.list);
  const handleSubmit = () => {
    dispatch(listExpenses(range.firstDay, range.lastDay));
  };

  return (
    <div className="mainContainer">
      <form className="formContainer">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="First Day"
            sx={{ width: "100%" }}
            value={range.firstDay}
            onChange={(value) => {
              handleChange(value, 1);
            }}
            focused
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Last Day"
            sx={{ width: "100%" }}
            value={range.lastDay}
            onChange={(value) => {
              handleChange(value, 2);
            }}
            focused
          />
        </LocalizationProvider>
        <Button onClick={() => handleSubmit()}>Go</Button>
      </form>
      <div>
        {!loading &&
          expenses &&
          expenses.map((k, i) => {
            return <ExpenseCard expense={k}></ExpenseCard>;
          })}
      </div>
    </div>
  );
}

export default AllExpense;
