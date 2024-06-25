export const API_CONFIG = {
  auth: {
    refreshToken: "auth/refresh-token",
    login: "/auth/login/metamask",
    logout: "/auth/logout",
    updateUserProfile: '/auth/edit-profile',
    getInformation: '/auth/me'
  },
  will: {
    myWill: "/will/my",
    myInheritedWill: "/will/my-inheritance",
    detail: "/will/detail",
    saveAsset: "/will/save-asset",
  },

  common: {
    countries: '/all?fields=name,cca2'
  }
} as const;
