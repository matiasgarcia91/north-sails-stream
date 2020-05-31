export const getStreamPermissionAndName = state => ({
  permission: state.user.permission,
  fullName: state.user.fullName,
});

export const getAdminPermission = state => ({
  admin: state.user.admin,
  email: state.user.email,
});
