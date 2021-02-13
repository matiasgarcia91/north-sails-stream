const initialState = {
  loading: false,
  accounts: [],
  apiUrl: "http://localhost:4001",
  livechat: 102932,
  streamUrl: 438316874,
  online: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPLOADING":
      return { ...state, loading: true };
    case "ACCOUNTS_CREATED":
      return { ...state, accounts: action.payload, loading: false };
    case "UPDATE_API_URL":
      return { ...state, apiUrl: action.payload };
    case "ADMIN_LOGIN":
      return { ...state, online: true };
    case "ADMIN_LOGOUT":
      return { ...state, online: false };
    default:
      return state;
  }
}
