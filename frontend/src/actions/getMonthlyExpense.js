import axios from "./../axios";

const monthlyExpense = () => async (dispatch) => {
  try {
    dispatch({ type: "MEREQUEST" });
    const { data } = await axios.get(`/api/expReport/month`);
    dispatch({ type: "MESUCCESS", payload: data.expensePreview });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "MEFAIL", payload: err.response.data.err });
  }
};
export default monthlyExpense;
