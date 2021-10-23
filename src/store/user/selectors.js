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

export const streamCode = state => state.user.event?.streamCode;
export const getLivechatId = state => state.user.event?.livechatId;
export const getStreamEnded = state => state.user.streamEnded;
