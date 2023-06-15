import React from "react";
import { Link } from "react-router-dom";
import { Add } from "@mui/icons-material";
import { Logout } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import logout from "../actions/logout";
import { Description, ExpandMore } from "@mui/icons-material";
import { useState } from "react";
function Header() {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleLogout = (e) => {
    e.preventDefault();

    dispatch(logout());
  };
  return (
    <div>
      <div className="flex bg-green-700 text-gray-100 h-14 items-center justify-between px-12">
        <Link to="/">
          {" "}
          <div className="text-2xl font-semibold">Expense Tracker</div>
        </Link>
        <div className="flex space-x-5">
          <button
            className="text-gray-100  py-1 px-4 text-xl cursor-pointer relative bg-green-600"
            onClick={() => {
              setOpen((e) => !e);
            }}
          >
            <ExpandMore></ExpandMore>Reports
          </button>
          <div
            className={
              !open
                ? " absolute z-10 bg-green-700  mt-10 hidden w-32"
                : " absolute z-10 bg-green-700  mt-10 flex flex-col space-y-7 w-32 items-center py-5 font-semibold"
            }
          >
            <Link to="/all/expense">List Expenses</Link>
            <Link to="/expense/report/monthly">Month Report</Link>
            <Link to="/expense/report/graph">Graph Report</Link>
            <Link to="/expense/report/yearPlot">Yearly plot</Link>
            <Link to="/expense/report/piePlot">Pie plot</Link>
          </div>
          <Link
            className="bg-gray-100 text-green-700 py-1 px-4 text-xl font-semibold"
            to="/add/expense"
          >
            <Add></Add>
            Add Expense
          </Link>
          <button
            className="text-gray-100  py-1 px-4 text-xl"
            onClick={(e) => handleLogout(e)}
          >
            <Logout></Logout>Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Header;
