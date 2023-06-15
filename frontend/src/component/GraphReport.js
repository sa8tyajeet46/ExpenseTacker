import React from "react";
import {
  VictoryChart,
  VictoryTheme,
  VictoryScatter,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import { format } from "date-fns";
import Header from "./Header";
import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import plotExpense from "../actions/plotExpense";
import { Datum } from "victory";
function GraphReport() {
  const dispatch = useDispatch();

  const [month, setMonth] = useState(null);
  const handleChange = (value) => {
    setMonth(format(value.$d, "yyyy-MM"));
  };
  const { expense } = useSelector((state) => state.plot);
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(plotExpense(month));
  };
  return (
    <div>
      <Header></Header>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full p-5 flex justify-center items-center space-x-3"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Month"
            sx={{ width: "40%" }}
            views={["month", "year"]}
            onChange={(value) => {
              handleChange(value);
            }}
            focused
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}></LocalizationProvider>
        <button
          type="submit"
          className="bg-green-700 py-3 px-6 rounded-md text-white"
        >
          Go
        </button>
      </form>
      {expense && (
        <VictoryChart
          theme={VictoryTheme.material}
          height={400}
          width={550}
          domainPadding={40}
        >
          <VictoryScatter
            style={{
              data: { fill: "#01579b", stroke: "#69f0ae", strokeWidth: 2 },
              labels: { fill: "#01579b", fontSize: 10, padding: 8 },
            }}
            bubbleProperty="y"
            maxBubbleSize={15}
            minBubbleSize={5}
            labels={(e) => `$${e.datum.y} on ${e.datum.x}th`}
            labelComponent={<VictoryTooltip></VictoryTooltip>}
            data={expense}
            domain={{ x: [0, 31] }}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 14, fill: "#8b8b8b" }}
            x={270}
            y={390}
            text={`day of month`}
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 14, fill: "#8b8b8b" }}
            x={6}
            y={190}
            angle={270}
            text={`Amount ($)`}
          />
        </VictoryChart>
      )}
    </div>
  );
}

export default GraphReport;
