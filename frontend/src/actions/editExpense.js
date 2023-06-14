import axios from "./../axios";

const editExpense = (id, exp) => async (dispatch) => {
  try {
    dispatch({ type: "EDITREQUEST" });
    const { data } = await axios.put(
      `/api/exp/${id}`,
      { ...exp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({
      type: "EDITSUCCESS",
      payload: { expense: data.expense, message: data.message },
    });
  } catch (err) {
    dispatch({ type: "EDITFAIL", payload: err.response.data.err });
  }
};
export default editExpense;
