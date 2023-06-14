import axios from "./../axios";

const deleteExpense = (id) => async (dispatch) => {
  try {
    dispatch({ type: "DELETEREQUEST" });
    const { data } = await axios.delete(`/api/exp/${id}`);
    dispatch({
      type: "DELETESUCCESS",
      payload: data.message,
    });
  } catch (err) {
    dispatch({ type: "DELETEFAIL", payload: err.response.data.err });
  }
};
export default deleteExpense;
