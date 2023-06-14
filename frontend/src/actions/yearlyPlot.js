import axios from "./../axios";

const yearlyPlot = (year) => async (dispatch) => {
  try {
    dispatch({ type: "YPLOTREQUEST" });
    const { data } = await axios.get(`/api/expReport/graph?year=${year}`);

    dispatch({ type: "YPLOTSUCCESS", payload: data.monthTot });
  } catch (err) {
    // console.log(err);
    dispatch({ type: "YPLOTFAIL", payload: err.response.data.err });
  }
};
export default yearlyPlot;
