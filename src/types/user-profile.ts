export enum VerifyStatus {
  Unverified = 'Unverified',
  Verified = 'Verified'
}

export enum EnableStatus {
  Disabled = 'Disabled',
  Enabled = 'Enabled'
}

export type TLoginHistory = {
  date: string;
  method: string;
  country: string;
  ip: string;
};

export enum ETipsHistoryType {
  OUTCOME = 'OUTGOING',
  INCOME = 'INCOMING'
}

export type TTipsHistory = {
  sender?: string | null;
  recipient?: string | null;
  amount: number;
  sentAt: string;
  type: ETipsHistoryType;
};

export interface ITipDialog {
  isOpen: boolean;
  onClose?: () => void;
  recipientUsername: string;
  availableBalance: number;
  targetUuid: string;
}

export enum ETipFormItems {
  amount = 'amount',
  showInChat = 'showInChat',
  twoFA = 'twoFA'
}

export interface ITipForm {
  [ETipFormItems.amount]: number | string;
  [ETipFormItems.showInChat]: boolean;
  [ETipFormItems.twoFA]: string | number;
}
