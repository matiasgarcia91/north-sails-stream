export const getStreamPermissionAndName = state => ({
  permission: state.user.permission,
  fullName: state.user.fullName,
  email: state.user.email,
});

export const getAdminPermission = state => ({
  admin: state.user.admin,
  email: state.user.email,
});

export const getError = state => state.user.error;
