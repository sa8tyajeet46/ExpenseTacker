import { format } from "date-fns";
import React from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
function ExpenseCard({ expense }) {
  const navigate = useNavigate();
  return (
    <div>
      <div>{expense.title}</div>
      <div>{expense.category}</div>
      <div>{expense.note}</div>
      <div>{expense.amount}</div>
      <div>{format(new Date(expense.incurred_on), "dd/MM/yyyy")}</div>
      <Button onClick={() => navigate(`/expense/${expense._id}`)}>Edit</Button>
    </div>
  );
}

export default ExpenseCard;
