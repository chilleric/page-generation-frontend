export const apiRoute = {
  user: {
    getListUser: 'user/get-list-users',
    getDetailUser: 'user/get-detail-user',
    changeStatus: 'user/change-status-user',
    addNewUser: 'user/add-new-user',
    updateUser: 'user/update-user',
  },
  auth: {
    login: '/auth/login',
    signUp: '/auth/register',
    verifySignUp: '/auth/verify-email',
    logout: '/auth/logout',
    verify2FA: '/auth/verify-2fa',
    forgotPassword: '/auth/forgot-password',
  },
  inventory: {
    inventory: 'inventory',
    detailInventory: 'inventory/detailed-inventory',
  },
}
