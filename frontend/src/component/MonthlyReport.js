import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import monthlyExpense from "../actions/getMonthlyExpense";

function MonthlyReport() {
  const dispatch = useDispatch();
  const { expense } = useSelector((state) => state.monthlyExpense);
  useEffect(() => {
    dispatch(monthlyExpense());
  }, []);
  return (
    <div>
      {expense && (
        <div>
          <div>month {expense.month ? expense.month.totalSpent : 0}</div>
          <div>today {expense.today ? expense.today.totalSpent : 0}</div>
          <div>
            yesterday {expense.yesterday ? expense.yesterday.totalSpent : 0}
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyReport;
