import React from "react";
import { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers";
import format from "date-fns/format";
import { Button } from "@mui/material";
import {
  VictoryPie,
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip,
} from "victory";
import { useDispatch, useSelector } from "react-redux";
import piePlotExpense from "../actions/piePlotExpense";
function PieChartExpense() {
  const dispatch = useDispatch();
  const [range, setRange] = useState({ firstDay: null, lastDay: null });
  const { expense } = useSelector((state) => state.pieplot);
  const handleChange = (value, x) => {
    if (x === 1) {
      setRange({ ...range, firstDay: format(value.$d, "yyyy-MM-dd") });
    }
    if (x == 2) {
      setRange({ ...range, lastDay: format(value.$d, "yyyy-MM-dd") });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //dispatch(listExpenses(range.firstDay, range.lastDay));
    //console.log(range);
    dispatch(piePlotExpense(range.firstDay, range.lastDay));
  };
  return (
    <div>
      <form className="formContainer">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="First Day"
            sx={{ width: "100%" }}
            value={range.firstDay}
            onChange={(value) => {
              handleChange(value, 1);
            }}
            focused
          />
        </LocalizationProvider>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Last Day"
            sx={{ width: "100%" }}
            value={range.lastDay}
            onChange={(value) => {
              handleChange(value, 2);
            }}
            focused
          />
        </LocalizationProvider>
        <Button onClick={(e) => handleSubmit(e)}>Go</Button>
      </form>
      {expense && (
        <div style={{ width: 550, margin: "auto" }}>
          <svg viewBox="0 0 320 320">
            <VictoryPie
              standalone={false}
              data={expense}
              innerRadius={50}
              theme={VictoryTheme.material}
              labelRadius={({ innerRadius }) => innerRadius + 14}
              labelComponent={
                <VictoryTooltip
                  text={({ datum }) => `${datum.x}\n Rs${datum.y}`}
                ></VictoryTooltip>
                // <VictoryLabel
                //   angle={0}
                //   style={[
                //     {
                //       fontSize: "11px",
                //       fill: "#0f0f0f",
                //     },
                //     {
                //       fontSize: "10px",
                //       fill: "#013157",
                //     },
                //   ]}
                //   text={({ datum }) => `${datum.x}\n Rs${datum.y}`}
                // />
              }
            />
            <VictoryLabel
              textAnchor="middle"
              style={{ fontSize: 14, fill: "#8b8b8b" }}
              x={175}
              y={170}
              text={`Spent \nper category`}
            />
          </svg>
        </div>
      )}
    </div>
  );
}

export default PieChartExpense;
