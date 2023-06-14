import axios from "./../axios";

const categoryExpense = () => async (dispatch) => {
  try {
    dispatch({ type: "CEREQUEST" });
    const { data } = await axios.get(`/api/expReport/category`);
    dispatch({ type: "CESUCCESS", payload: data.categoryMonthlyAvg });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "CEFAIL", payload: err.response.data.err });
  }
};
export default categoryExpense;
