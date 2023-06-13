import axios from "./../axios";
const logout = () => async (dispatch) => {
  dispatch({ type: "LOGOUTREQUEST" });
  await axios.get("/api/user/logout");
  dispatch({ type: "LOGOUTSUCCESS" });
};
export default logout;
