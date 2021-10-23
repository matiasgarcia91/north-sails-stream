const initialState = {
  loading: false,
  accounts: [],
  event: null,
  online: false,
  user: null,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case "UPLOADING":
      return { ...state, loading: true };
    case "ACCOUNTS_CREATED":
      return { ...state, accounts: action.payload, loading: false };
    case "admin/USER_LIST": {
      return { ...state, accounts: action.payload, loading: false };
    }
    case "ADMIN_LOGIN":
      const { user, event } = action.payload;
      return { ...state, online: true, user, event };
    case "ADMIN_LOGOUT":
      return { ...state, online: false };
    default:
      return state;
  }
}
