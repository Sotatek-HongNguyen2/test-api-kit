export enum EWalletType {
  MAIN = 'MAIN',
  CHALLENGE = 'CHALLENGE',
  BATTLE = 'BATTLE'
}

export type TWalletInfo = {
  walletType: EWalletType;
  walletUuid: string | null;
  walletName?: string;
  walletBalance: string;
  missionUuid: string | null;
};
