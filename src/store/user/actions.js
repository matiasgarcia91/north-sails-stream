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

export const abortConnection = () => ({ type: "DISCONNECT" });

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
    dispatch(loginError("Invalid credentials"));
    console.error(e.message);
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
