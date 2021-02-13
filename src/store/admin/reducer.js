const initialState = {
  loading: false,
  accounts: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPLOADING":
      return { ...state, loading: true };
    case "ACCOUNTS_CREATED":
      return { accounts: action.payload, loading: false };
    default:
      return state;
  }
}
