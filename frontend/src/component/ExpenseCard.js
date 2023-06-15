import { format } from "date-fns";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Edit } from "@mui/icons-material";
function ExpenseCard({ expense }) {
  const navigate = useNavigate();
  return (
    <div className="w-[80%] border-green-700 border-2 rounded-lg my-5 flex px-5 justify-between">
      <div className="w-[20%] flex flex-col space-y-2 py-5">
        {" "}
        <div className="text-2xl text-green-700 font-semibold">
          ₹ {expense.amount}
        </div>
        <div className="font-semibold text-xl">{expense.category}</div>
        <div className="w-24 h-[1px] bg-gray-300"></div>
        <div className="text-gray-700">
          {format(new Date(expense.incurred_on), "dd/MM/yyyy")}
        </div>
      </div>
      <div>{expense.note}</div>
      <button onClick={() => navigate(`/expense/${expense._id}`)}>
        <Edit></Edit>
      </button>
    </div>
  );
}

export default ExpenseCard;
