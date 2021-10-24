const initialState = {
  loading: false,
  accounts: [],
  event: null,
  online: false,
  user: null,
  loadingState: {
    eventForm: false,
  },
};

export default function reducer(state = initialState, action) {
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
    case "UPDATING_SETTINGS":
      return {
        ...state,
        loadingState: { ...state.loadingState, eventForm: true },
      };
    case "UPDATED/SETTINGS": {
      return {
        ...state,
        loadingState: {
          ...state.loadingState,
          eventForm: false,
        },
        event: action.payload,
      };
    }
    default:
      return state;
  }
}
