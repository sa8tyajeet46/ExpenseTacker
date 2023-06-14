import axios from "./../axios";

const plotExpense = (month) => async (dispatch) => {
  try {
    dispatch({ type: "PLOTREQUEST" });
    const { data } = await axios.get(`/api/expReport/plot?month=${month}`);

    dispatch({ type: "PLOTSUCCESS", payload: data.totalMonthly });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "PLOTFAIL", payload: err.response.data.err });
  }
};
export default plotExpense;
