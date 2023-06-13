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
          element={
            user.auth ? (
              <EditExpense></EditExpense>
            ) : (
              <EditExpense></EditExpense>
            )
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
