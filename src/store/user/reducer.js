const initialState = {
  permission: false,
  socketId: null,
  streamEnded: false,
  error: null,
  streamCode: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "SOCKET_ID":
      return { ...state, socketId: action.payload };
    case "LOGIN":
      return { ...state, ...action.payload, permission: true };
    case "LOGIN_ERROR":
      return {
        ...state,
        error: action.payload,
        streamCode: state.streamCode,
      };
    case "DISCONNECT":
      return {
        ...state,
        socketId: state.socketId,
        permission: false,
        admin: false,
      };
    case "STREAM_END":
      return {
        ...state,
        socketId: state.socketId,
        permission: false,
        admin: false,
        streamEnded: true,
      };
    case "SET_VIDEO_CODE":
      return { ...state, streamCode: action.payload };
    default:
      return state;
  }
}
