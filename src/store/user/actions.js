import axios from "../axios";

export const saveSocketId = socketId => ({
  type: "SOCKET_ID",
  payload: socketId,
});

export const loginSuccess = (id, email) => ({
  type: "LOGIN",
  payload: { id, email },
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
    console.log(response);
    const { data } = response;
    dispatch(loginSuccess(data.id, data.email));
    history.push("/stream");
  } catch (e) {}
};
