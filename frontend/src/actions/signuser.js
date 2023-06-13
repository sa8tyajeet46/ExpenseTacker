import axios from "./../axios";
const signuser = (email, password, name) => async (dispatch) => {
  try {
    dispatch({ type: "SIGNUSER" });
    const { data } = await axios.post(
      "/api/user/signin",
      { email, password, name },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch({ type: "SIGNUSERSUCCESS", payload: data.user });
  } catch (err) {
    console.log(err);
    dispatch({ type: "SIGNUSERFAIL", payload: err.response.data.err });
  }
};

export default signuser;
