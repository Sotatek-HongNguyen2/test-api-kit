export enum HomePaths {
  HOME = "/",
  NO_AUTH = "/no-auth",
}

export enum WillPaths {
  EDIT_WILL = "/edit",
  DETAIL_WILL = "/detail",
  CONFIG_WILL = "/config",
}

export const APP_ROUTES_PATHS = {
  ...HomePaths,
  ...WillPaths,
} as const;

export type AppRouteType = typeof APP_ROUTES_PATHS;
