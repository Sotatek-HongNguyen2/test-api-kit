export enum ClanNotificationType {
  CLAN_BALANCE = 'CLAN_BALANCE',
  CLAN_WAGERED = 'CLAN_WAGERED',
  CLAN_BET = 'CLAN_BET',
  CLAN_EVENT = 'CLAN_EVENT',
  CLAN_MEMBER_BALANCE = 'CLAN_MEMBER_BALANCE',
  CLAN_MEMBER_WAGERED = 'CLAN_MEMBER_WAGERED',
  CLAN_PNL = 'CLAN_PNL',
  ALL_CLAN_COMMON_BET = 'ALL_CLAN_COMMON_BET',
  CLAN_MIN_STAKE = 'CLAN_MIN_STAKE',
  CLAN_PASSWORD = 'CLAN_PASSWORD',
  CLAN_START_GAME = 'CLAN_START_GAME',
  CLAN_END_GAME = 'CLAN_END_GAME'
}

interface Commission {
  available: number;
  claimed: number;
  commission: number;
  memberUUid: string;
  wagered: number;
}

export interface IBalanceChange {
  type: ClanNotificationType;
  amount: string;
  pnl: string;
  datetime: string;
  payload: any;
  time: string;
}

export interface ICommissionChange {
  newCommission: Commission;
  oldCommission: Commission;
  payload: { disabledReferral: boolean };
}

export interface IEmailVerificationChange {
  payload: {
    message: string;
    code: number;
  };
  type: 'VERIFY_EMAIL';
}

export enum IWSStatus {
  WS_IS_CONNECTED = 'WS_IS_CONNECTED'
}

export const WebsocketTopic = {
  FIREBLOCKS: '/topic/FIREBLOCKS',
  BALANCE: '/topic/BALANCE',
  VERIFY_EMAIL: `/topic/VERIFY_EMAIL`,
  clan: (uuidClan) => `/p_topic/CLAN/${uuidClan}`,
  allClansBets: () => `/p_topic/CLAN/${window?.env?.VITE_DEFAULT_BRAND_ID as string}`,
  clanMember: (uuidClan, uuidUser) => `/topic/CLAN/${uuidClan}/${uuidUser}`,
  referral: (uuid) => `/topic/REFERRAL_UPDATED/${uuid}`,
  allBets: '/topic/BET',
  myBets: (uuid) => `/topic/BET/${uuid}`,
  menuReward: (uuid) => `/topic/SPLIT_REWARD/${uuid}`,
  reward: (uuid) => `/topic/REWARD/${uuid}`,
  rebateBoost: (uuid) => `/topic/REBATE_BOOST/${uuid}`,
  favorite: (uuid: string) => `/topic/HOME_PAGE/${uuid}`,
  listBalance: (uuid: string) => `/topic/EXTRA_BALANCE/${uuid}`,
  challengeClaimed: (challengeUuid: string) => `/topic/CHALLENGE/${challengeUuid}`,
  BATTLE_LIST: () => `/p_topic/BATTLE_LIST/${window?.env?.VITE_DEFAULT_BRAND_ID as string}`,
  battleDetail: (battleUuid: string) => `/topic/BATTLE_DETAILS/${battleUuid}`,
  updateEmailTopic: (uuid: string) => `/topic/UPDATE_EMAIL_LIMIT/${uuid}`,
  memberOnline: (memberUUID: string) => `/topic/MEMBER_ONLINE/${memberUUID}`,
  logoutMemberOut: (memberUUID: string) => `/topic/FORCE_LOGOUT_MEMBER/${memberUUID}`,
  affiliateEstimatedCommission: (memberUUID: string) => `/topic/AFFILIATE_ESTIMATED_COMMISSION_UPDATE/${memberUUID}`,
  affiliateCommission: (memberUUID: string) => ` /topic/AFFILIATE_COMMISSION_UPDATE/${memberUUID}`
} as const;

export const WebsocketPublicTopic = {
  ALL_BET: () => `/p_topic/BET/${window.env?.VITE_DEFAULT_BRAND_ID as string}`,
  BET_WIN_LIVE: () => `/p_topic/BET_WON/${window.env?.VITE_DEFAULT_BRAND_ID as string}`,
  LEADERBOARD_LIVE: (type: string) => `/p_topic/${type}/${window.env?.VITE_DEFAULT_BRAND_ID as string}`,
  GAME_HOME: () => () => `/p_topic/HOME_PAGE/${window.env?.VITE_DEFAULT_BRAND_ID as string}`
};
