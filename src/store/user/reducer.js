const initialState = {
  userData: null,
  socketId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SOCKET_ID":
      return { ...state, socketId: action.payload };
    default:
      return state;
  }
}
