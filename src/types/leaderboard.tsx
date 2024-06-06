export enum LeaderboardFilter {
  ALL_TIME = 'ALLTIME',
  DAILY = 'DAILY',
  MONTHLY = 'MONTHLY',
  WEEKLY = 'WEEKLY'
}

export interface LeaderboardItem {
  id: string;
  playerName: string;
  rankIconUrl: string;
  wagered: string;
  prizesWon: string | null;
  dailyPrize: string | null;
  playerUuid?: string;
}
