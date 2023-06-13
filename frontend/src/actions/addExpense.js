import axios from "./../axios";
const addExpense =
  (title, amount, category, notes, incurred_on) => async (dispatch) => {
    try {
      dispatch({ type: "ADDEXPENSEREQUEST" });
      console.log({ title, amount, category, notes, incurred_on });
      const { data } = await axios.post(
        "/api/exp/create",
        { title, amount, category, notes, incurred_on },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      dispatch({
        type: "ADDEXPENSESUCCESS",
        payload: { expense: data.expense, message: data.message },
      });
    } catch (err) {
      console.log(err);
      dispatch({ type: "ADDEXPENSEFAIL", payload: err.response.data.err });
    }
  };

export default addExpense;
