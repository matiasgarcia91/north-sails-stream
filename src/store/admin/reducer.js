const initialState = {
  loading: false,
  accounts: [],
  apiUrl: "http://localhost:4001",
  livechat: 12918987,
  streamUrl: 438316874,
  online: false,
  user: null,
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
      return { ...state, online: true, user: { ...action.payload } };
    case "ADMIN_LOGOUT":
      return { ...state, online: false };
    default:
      return state;
  }
}
