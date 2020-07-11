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

export const setVideoCode = code => ({
  type: "SET_VIDEO_CODE",
  payload: code,
});

export const abortConnection = () => ({ type: "DISCONNECT" });
export const endStream = () => ({ type: "STREAM_END" });

export const login = (email, password, history) => async (
  dispatch,
  getState
) => {
  const { socketId } = getState().user;
  try {
    const response = await axios.post("/login", {
      email,
      password,
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
    const response = await axios.post("/admin/login", {
      email,
      password,
    });
    const { data } = response;
    dispatch(loginSuccess(data));
    history.push("/admin/edit");
  } catch (e) {
    console.error(e.message);
  }
};

export const getStreamCode = () => async dispatch => {
  try {
    const response = await axios.get("/url");
    const {
      data: { url },
    } = response;
    dispatch(setVideoCode(url));
  } catch (e) {
    console.error(e.message);
  }
};
