import axios from "../axios";

export const saveSocketId = socketId => ({
  type: "SOCKET_ID",
  payload: socketId,
});

export const login = (email, password) => async (dispatch, getState) => {
  const { socketId } = getState().user;
  try {
    const response = await axios.post("/login", {
      email,
      password,
      socketId,
    });
    console.log(response);
  } catch (e) {}
};
