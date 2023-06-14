import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./component/Login";
import { useDispatch, useSelector } from "react-redux";
import Home from "./component/Home";
import { useEffect } from "react";
import resetUser from "./actions/resetUser";
import Sign from "./component/Sign";
import AddExpense from "./component/AddExpense";
import AllExpense from "./component/AllExpense";
import EditExpense from "./component/EditExpense";
import MonthlyReport from "./component/MonthlyReport";
import GraphReport from "./component/GraphReport";
import Yearlychat from "./component/Yearlychat";
import PieChartExpense from "./component/PieChartExpense";

function App() {
  const { user } = useSelector((state) => state);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetUser());
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={user.auth ? <Home></Home> : <Login></Login>}
        ></Route>
        <Route
          path="/sign"
          element={user.auth ? <Home></Home> : <Sign></Sign>}
        ></Route>
        <Route
          path="/add/expense"
          element={user.auth ? <AddExpense></AddExpense> : <Login></Login>}
        ></Route>
        <Route
          path="/all/expense"
          element={user.auth ? <AllExpense></AllExpense> : <Login></Login>}
        ></Route>
        <Route
          path="/expense/:id"
          element={user.auth ? <EditExpense></EditExpense> : <Login></Login>}
        ></Route>
        <Route
          path="/expense/report/monthly"
          element={
            user.auth ? <MonthlyReport></MonthlyReport> : <Login></Login>
          }
        ></Route>
        <Route
          path="/expense/report/graph"
          element={user.auth ? <GraphReport></GraphReport> : <Login></Login>}
        ></Route>
        <Route
          path="/expense/report/yearPlot"
          element={user.auth ? <Yearlychat></Yearlychat> : <Login></Login>}
        ></Route>
        <Route
          path="/expense/report/piePlot"
          element={
            user.auth ? <PieChartExpense></PieChartExpense> : <Login></Login>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
