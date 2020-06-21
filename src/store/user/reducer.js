const initialState = {
  permission: false,
  socketId: null,
  admin: false,
  error: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SOCKET_ID":
      return { ...state, socketId: action.payload };
    case "LOGIN":
      return { ...state, ...action.payload, permission: true };
    case "LOGIN_ERROR":
      return { ...initialState, error: action.payload };
    case "DISCONNECT":
      return { socketId: state.socketId, permission: false, admin: false };
    default:
      return state;
  }
}
