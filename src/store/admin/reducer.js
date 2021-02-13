const initialState = {
  loading: false,
  accounts: [],
  apiUrl: "http://localhost:4001",
  livechat: 102932,
  streamUrl: 438316874,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPLOADING":
      return { ...state, loading: true };
    case "ACCOUNTS_CREATED":
      return { accounts: action.payload, loading: false };
    case "UPDATE_API_URL":
      return { ...state, apiUrl: action.payload };
    default:
      return state;
  }
}
