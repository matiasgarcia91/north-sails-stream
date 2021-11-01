const initialState = {
  accounts: [],
  event: null,
  online: false,
  user: null,
  loadingState: {
    accounts: false,
    eventForm: false,
    emailForm: false,
    addUser: false,
  },
  error: {
    accounts: null,
    eventForm: null,
    emailForm: null,
    addUser: null,
  },
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "SET_LOADING": {
      const key = action.payload;
      return {
        ...state,
        loadingState: { ...state.loadingState, [key]: true },
      };
    }
    case "SET_ERROR": {
      const key = action.payload.key;
      return {
        ...state,
        error: { ...state.error, [key]: action.payload.error },
        loadingState: { ...state.loadingState, [key]: false },
      };
    }
    case "ACCOUNTS_CREATED":
      return {
        ...state,
        accounts: action.payload,
        loadingState: {
          ...state.loadingState,
          accounts: false,
        },
      };
    case "admin/USER_LIST": {
      return {
        ...state,
        accounts: action.payload,
        loadingState: {
          ...state.loadingState,
          accounts: false,
        },
      };
    }
    case "ADMIN_LOGIN":
      const { user, event } = action.payload;
      return { ...state, online: true, user, event };
    case "ADMIN_LOGOUT":
      return { ...state, online: false };
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
    case "EMAIL_SENT":
      return {
        ...state,
        loadingState: { ...state.loadingState, emailForm: false },
      };

    case "USER_ADDED":
      return {
        ...state,
        loadingState: { ...state.loadingState, addUser: false },
        accounts: [...state.accounts, action.payload],
      };
    default:
      return state;
  }
}
