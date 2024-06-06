export enum ECreateBonusBattleField {
  GAME = 'GAME',
  AMOUNT = 'AMOUNT',
  PARTICIPANTS = 'PARTICIPANTS',
  START_WITH_INCOMPLETE_PARTICIPANTS = 'START_WITH_INCOMPLETE_PARTICIPANTS',
  IS_PRIVATE = 'IS_PRIVATE'
}

export type TCreateBattleForms = {
  [ECreateBonusBattleField.AMOUNT]: number | string | null;
  [ECreateBonusBattleField.GAME]: string | null;
  [ECreateBonusBattleField.PARTICIPANTS]: number | string | null;
  [ECreateBonusBattleField.IS_PRIVATE]: boolean;
  [ECreateBonusBattleField.START_WITH_INCOMPLETE_PARTICIPANTS]: boolean;
};

export enum EBonusBattlesTabs {
  Available = 'AVAILABLE',
  Active = 'ACTIVE',
  Completed = 'COMPLETED'
}

export enum EBonusBattlesSortOptions {
  NEW = 'NEW',
  BONUS_BUY_LOW = 'BONUS_BUY_LOW',
  BONUS_BUY_HIGH = 'BONUS_BUY_HIGH'
}

export enum EBattleCardStatus {
  AVAILABLE = 'AVAILABLE',
  OPEN_COUNTDOWN = 'OPEN_COUNTDOWN',
  STARTED = 'STARTED',
  ACTIVE = 'ACTIVE',
  RESULT_COUNTDOWN = 'RESULT_COUNTDOWN',
  COMPLETED = 'COMPLETED',
  FAILED_TO_START = 'FAILED_TO_START',
  LEFT = 'LEFT',
  JOIN = 'JOIN'
}

export enum EBattleStatus {
  NEW = 'NEW',
  STARTED = 'STARTED',
  COMPLETED = 'COMPLETED',
  CANCELED = 'CANCELED'
}

export enum EBattlePlayerStatus {
  JOINED = 'JOINED',
  LEFT = 'LEFT',
  FINISHED = 'FINISHED'
}

export enum EBattleIngameStatus {
  TIME_LEFT = 'TIME_LEFT',
  DONE = 'DONE',
  PLAYING = 'PLAYING'
}

export type TGameAmount = {
  id: number;
  amount: number;
};

export enum EBattleRoles {
  NON_JOINED_USER = 'NON_JOINED_USER',
  JOINED_USER = 'JOINED_USER',
  CREATOR = 'CREATOR'
}

export enum ESpecialBalanceLabels {
  EMPTY = '',
  PLAYING_BATTLE = 'PLAYING_BATTLE'
}
