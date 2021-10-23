export const isLoading = state => state.admin.loading;
export const createdAccounts = state =>
  state.admin.accounts.length && state.admin.accounts;
export const getSystemSettings = ({ admin }) => admin.event;
export const getAdminOnline = state => state.admin.online;
export const getAdminUser = state => state.admin.user;
