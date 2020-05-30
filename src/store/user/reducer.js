const initialState = {
  userData: null,
  streamAllowed: false,
  socketId: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SOCKET_ID":
      return { ...state, socketId: action.payload };
    case "LOGIN":
      return { ...state, ...action.payload, streamAllowed: true };
    case "DISCONNECT":
      return { ...state, userData: null, streamAllowed: false };
    default:
      return state;
  }
}
