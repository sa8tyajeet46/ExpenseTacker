import React from "react";
import {
  VictoryTheme,
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryTooltip,
} from "victory";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DateTimePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { Button } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import Header from "./Header";
import format from "date-fns/format";
import yearlyPlot from "../actions/yearlyPlot";
function Yearlychat() {
  const dispatch = useDispatch();
  const monthStrings = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const [year, setYear] = useState(null);
  const { expense } = useSelector((state) => state.yplot);
  const handleChange = (value) => {
    setYear(format(value.$d, "yyyy"));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(yearlyPlot(year));
  };
  console.log(expense);
  return (
    <div>
      {" "}
      <Header></Header>
      <form
        onSubmit={(e) => handleSubmit(e)}
        className="w-full p-5 flex justify-center items-center space-x-3"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Year"
            sx={{ width: "40%" }}
            views={["year"]}
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
          domainPadding={0}
          height={300}
          width={450}
        >
          <VictoryAxis />
          <VictoryBar
            categories={{
              x: monthStrings,
            }}
            style={{
              data: { fill: "#69f0ae", width: 20 },
              labels: { fill: "#01579b" },
            }}
            data={expense}
            labelComponent={<VictoryTooltip></VictoryTooltip>}
            x={monthStrings["x"]}
            domain={{ x: [0, 13] }}
            labels={(datum) => {
              console.log(datum);
              return `Rs${datum.datum.y}`;
            }}
          />
        </VictoryChart>
      )}
    </div>
  );
}

export default Yearlychat;
