import axios from "./../axios";
const loaduser = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: "LOADUSER" });
    const { data } = await axios.post(
      "/api/user/login",
      { email, password },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "LOADUSERSUCCESS", payload: data.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: "LOADUSERFAIL", payload: err.response.data.err });
  }
};

export default loaduser;
