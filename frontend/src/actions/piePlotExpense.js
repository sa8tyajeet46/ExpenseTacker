import axios from "./../axios";

const piePlotExpense = (firstDay, lastDay) => async (dispatch) => {
  try {
    dispatch({ type: "PIEREQUEST" });
    const { data } = await axios.get(
      `/api/expReport/avg/category?firstDay=${firstDay}&lastDay=${lastDay}`
    );

    dispatch({ type: "PIESUCCESS", payload: data.monthAVG });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "PIEFAIL", payload: err.response.data.err });
  }
};
export default piePlotExpense;
