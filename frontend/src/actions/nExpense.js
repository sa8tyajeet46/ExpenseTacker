import axios from "./../axios";

const getExpense = (id) => async (dispatch) => {
  try {
    dispatch({ type: "NEWEXPREQUEST" });
    const { data } = await axios.get(`/api/exp/${id}`);
    //console.log(expense);
    dispatch({ type: "NEWEXPSUCCESS", payload: data.expense });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "NEWEXPFAIL", payload: err.response.data.err });
  }
};
export default getExpense;
