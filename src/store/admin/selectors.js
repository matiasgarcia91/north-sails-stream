export const isLoading = state => state.admin.loading;
export const createdAccounts = state =>
  state.admin.accounts.length && state.admin.accounts;
