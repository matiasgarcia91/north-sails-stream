import axios from "../axios";

export const saveSocketId = socketId => ({
  type: "SOCKET_ID",
  payload: socketId,
});

export const loginSuccess = data => ({
  type: "LOGIN",
  payload: { ...data },
});

export const loginError = message => ({
  type: "LOGIN_ERROR",
  payload: message,
});

export const setEvent = event => ({
  type: "SET_EVENT",
  payload: event,
});

export const abortConnection = () => ({ type: "DISCONNECT" });
export const endStream = () => ({ type: "STREAM_END" });

export const login =
  (email, password, history) => async (dispatch, getState) => {
    const { socketId } = getState().user;
    try {
      const response = await axios.post("/login", {
        email: email.trim(),
        password: password.trim(),
        socketId,
      });
      const { data } = response;
      dispatch(loginSuccess(data));
      history.push("/stream");
    } catch (e) {
      console.log(e.response.data);
      dispatch(loginError(e.response.data));
    }
  };

export const adminLogin = (email, password, history) => async dispatch => {
  try {
    const response = await axios.post("/login/admin", {
      email,
      password,
    });
    dispatch({ type: "ADMIN_LOGIN", payload: response.data });
    history.push("/admin");
  } catch (e) {
    console.error(e.message);
  }
};

export const getEvent = () => async dispatch => {
  try {
    const response = await axios.get("/admin/event");
    const {
      data: { event },
    } = response;
    dispatch(setEvent(event));
  } catch (e) {
    console.error(e.message);
  }
};
