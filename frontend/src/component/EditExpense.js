import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Button } from "@mui/material";
function EditExpense() {
  const { id } = useParams();
  const { expenses } = useSelector((state) => state.list);
  const [expense, setExpense] = useState({});
  useEffect(() => {
    const data = expenses.find((e) => e._id === id);
    // console.log(data);
    expenses && setExpense({ ...data });
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(expense);
  };
  const handleDelete = () => {};
  return (
    <div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input value={expense.title}></input>
        <input value={expense.category}></input>
        <input value={expense.notes}></input>
        <input value={expense.amount}></input>
        <Button type="submit">Edit</Button>
      </form>
      <Button onClick={() => handleDelete()}>Delete</Button>
    </div>
  );
}

export default EditExpense;
