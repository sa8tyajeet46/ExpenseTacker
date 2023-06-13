import axios from "./../axios";

const listExpenses = (firstDay, lastDay) => async (dispatch) => {
  try {
    dispatch({ type: "LISTREQUEST" });
    const { data } = await axios.get(
      `/api/exp/list/?firstDay=${firstDay}&lastDay=${lastDay}`
    );
    dispatch({
      type: "LISTSUCCESS",
      payload: data.expenses,
    });
  } catch (err) {
    //   console.log(err);
    dispatch({ type: "LISTFAIL", payload: err.response.data.err });
  }
};
export default listExpenses;
