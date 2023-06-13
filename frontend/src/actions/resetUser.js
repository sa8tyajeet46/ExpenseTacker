import axios from "./../axios";
const resetUser = () => async (dispatch) => {
  try {
    dispatch({ type: "RESETUSER" });
    const { data } = await axios.get("/api/user/me");
    dispatch({ type: "RESETUSERSUCCESS", payload: data.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: "RESETUSERFAIL", payload: err.response.data.err });
  }
};

export default resetUser;
