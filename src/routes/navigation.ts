export enum HomePaths {
  HOME = '/'
}

export enum WillPaths {
  CREATE_WILL = '/create-will',
  DETAIL_WILL = '/detail',
}

export const APP_ROUTES_PATHS = {
    ...HomePaths,
    ...WillPaths,
} as const;

export type AppRouteType = typeof APP_ROUTES_PATHS;
