const initialState = {
  userData: null,
  permission: false,
  socketId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SOCKET_ID":
      return { ...state, socketId: action.payload };
    case "LOGIN":
      return { ...state, ...action.payload, permission: true };
    case "DISCONNECT":
      return { ...state, userData: null, permission: false };
    default:
      return state;
  }
}
