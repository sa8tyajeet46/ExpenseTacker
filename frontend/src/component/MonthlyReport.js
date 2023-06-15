import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import monthlyExpense from "../actions/getMonthlyExpense";
import Header from "./Header";
function MonthlyReport() {
  const dispatch = useDispatch();
  const { expense } = useSelector((state) => state.monthlyExpense);
  useEffect(() => {
    dispatch(monthlyExpense());
  }, []);
  return (
    <div>
      <Header></Header>
      {expense && (
        <div className="w-full py-10 flex items-center flex-col">
          <div className="text-green-700 font-semibold text-xl">
            you have spent
          </div>
          <div className="border border-green-700 p-10 m-5 rounded-md flex space-x-4">
            <div className="w-36 h-36 rounded-full bg-green-700 flex justify-center items-center text-gray-100 font-semibold flex-col">
              <div>₹{expense.month ? expense.month.totalSpent : 0}</div>
              <div>This month</div>
            </div>
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="border border-green-700 p-2 rounded-md font-semibold">
                ₹ {expense.today ? expense.today.totalSpent : 0} today
              </div>
              <div className="border border-green-700 p-2 rounded-md font-semibold">
                ₹ {expense.yesterday ? expense.yesterday.totalSpent : 0}{" "}
                yesterday
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MonthlyReport;
