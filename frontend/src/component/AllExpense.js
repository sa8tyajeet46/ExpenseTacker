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
import Header from "./Header";
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
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(listExpenses(range.firstDay, range.lastDay));
  };

  return (
    <div>
      <Header></Header>
      <div className="">
        <form className="w-[80%] flex justify-evenly p-10 items-center">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="First Day"
              sx={{ width: "40%" }}
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
              sx={{ width: "40%" }}
              value={range.lastDay}
              onChange={(value) => {
                handleChange(value, 2);
              }}
              focused
            />
          </LocalizationProvider>
          <button
            onClick={(e) => handleSubmit(e)}
            className="bg-green-600 text-gray-100 w-24 h-12 rounded-lg font-semibold"
          >
            Go
          </button>
        </form>
        <div className="w-full flex justify-center flex-col items-center">
          {!loading &&
            expenses &&
            expenses.map((k, i) => {
              return <ExpenseCard expense={k}></ExpenseCard>;
            })}
        </div>
      </div>
    </div>
  );
}

export default AllExpense;
