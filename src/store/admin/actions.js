import axios from "../axios";

const setLoading = (which) => ({ type: "SET_LOADING", payload: which });

export const uploadCSV =
  (selectedFile, amountOfDummies, domain) => async (dispatch, getState) => {
    try {
      const accountsCreated = (accounts) => ({
        type: "ACCOUNTS_CREATED",
        payload: accounts,
      });

      dispatch(setLoading("accounts"));

      const formData = new FormData();

      formData.append("file", selectedFile);
      formData.append("dummies", amountOfDummies);
      formData.append("domain", domain);

      const response = await axios.post("/csv-upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data);
      dispatch(accountsCreated(response.data));
    } catch (e) {
      console.log("Error", e.message);
    }
  };

export const fetchUserAccounts = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading("accounts"));
    const { token } = getState().admin.user;
    const response = await axios.get("/admin/users", {
      headers: {
        authorization: `Bearer ${token}`,
      },
    });
    dispatch({ type: "admin/USER_LIST", payload: response.data });
  } catch (e) {
    console.log(e.message);
  }
};

export const updateEventSettings =
  (streamEvent) => async (dispatch, getState) => {
    try {
      dispatch(setLoading("eventForm"));
      console.log("in action", streamEvent);
      const { token } = getState().admin.user;
      const response = await axios.patch(
        "/admin/event",
        { streamEvent },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("event updated", response.data);

      dispatch({
        type: "UPDATED/SETTINGS",
        payload: response.data.streamEvent,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

export const sendEmailCampaign =
  ({ content, subject, userIds, all }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading("emailForm"));
      const { token } = getState().admin.user;

      const to = all ? { all } : { userIds };
      const body = { content, subject, ...to };

      const response = await axios.post("/admin/users/email", body, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      });

      console.log("email sent", response.data);

      dispatch({
        type: "EMAIL_SENT",
        payload: response.data.streamEvent,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

export const deleteUsers =
  ({ userIds }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading("deleteUsers"));

      const { token } = getState().admin.user;

      const body = { userIds };

      console.log("body", body);

      const response = await axios.put("/admin/users", body, {
        headers: { authorization: `Bearer ${token}` },
      });

      console.log("users deleted", response.data);

      dispatch({
        type: "USERS_DELETED",
        payload: userIds,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

export const addUser =
  ({ fullName, email, admin }) =>
  async (dispatch, getState) => {
    try {
      dispatch(setLoading("addUser"));

      const { token } = getState().admin.user;

      const body = { fullName, email, admin };

      const response = await axios.post("/admin/users", body, {
        headers: { authorization: `Bearer ${token}` },
      });

      console.log("user added", response.data);

      dispatch({
        type: "USER_ADDED",
        payload: response.data,
      });
    } catch (e) {
      console.log(e.message);
    }
  };

export const resetDatabase = () => async (dispatch, getState) => {
  try {
    dispatch(setLoading("resetDB"));

    const { token } = getState().admin.user;

    const response = await axios.post(
      "/admin/reset-db",
      {},
      {
        headers: { authorization: `Bearer ${token}` },
      }
    );

    dispatch({
      type: "DB_RESET",
      payload: response.data.users,
    });
  } catch (e) {
    console.log(e.message);
  }
};
