export const API_CONFIG = {
  auth: {
    refreshToken: "/auth/refresh-token",
    login: "/auth/login/metamask",
    logout: "/auth/logout",
  },
  will: {
    myWill: "/will/my",
    myInheritedWill: "/will/my-inheritance",
    detail: "/will/detail",
    saveAsset: "/will/save-asset",
  }
} as const;
