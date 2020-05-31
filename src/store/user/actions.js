import axios from "../axios";

export const saveSocketId = socketId => ({
  type: "SOCKET_ID",
  payload: socketId,
});

export const loginSuccess = (id, email, fullName) => ({
  type: "LOGIN",
  payload: { id, email, fullName },
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
    console.log(response.data.fullName);
    const { data } = response;
    dispatch(loginSuccess(data.id, data.emai, data.fullName));
    history.push("/stream");
  } catch (e) {}
};
