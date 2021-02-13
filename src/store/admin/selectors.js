export const isLoading = state => state.admin.loading;
export const createdAccounts = state =>
  state.admin.accounts.length && state.admin.accounts;
export const getAPI = state => state.admin.apiUrl;
export const getSystemSettings = ({
  admin: { apiUrl, livechat, streamUrl },
}) => ({ apiUrl, livechat, streamUrl });
