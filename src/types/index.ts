export type BOOLEAN_REACT_DOM = 1 | 0;

const KeyToVal = {
  key1: 'user_reject',
  key2: 'un_support_chain',
  key3: 'no_eth_provider'
} as const;

type Keys = keyof typeof KeyToVal;
type Values = (typeof KeyToVal)[Keys];

export type WEB3_ERROR = {
  type: Values;
  message: string;
  /*
  object error
  */
  description: any;
};

export enum TypeNft {
  Preview = 'Preview',
  P2Peer = 'P2Peer',
  P2Pool = 'P2Pool'
}

export enum LoanType {
  PeerToPeer = 'peer',
  PeerToPool = 'pool'
}

export enum TRANSACTION_STATUS {
  PENDING = 'PENDING',
  COMPLETE = 'COMPLETE'
}

export interface BundleElement {
  tokenContract: string; //address of the token contract
  ids: string[]; // nft ids
  safeTransferable: boolean; // wether the implementing token contract has a safeTransfer function or not
}

export enum EProgressStatus {
  Pending = 'Pending',
  Completed = 'Completed'
}

export enum ERanks {
  Unranked = 'Unrank',
  Bronze = 'Bronze',
  Silver = 'Silver',
  Gold = 'Gold',
  Platinum_1 = 'Platinum I',
  Platinum_2 = 'Platinum II',
  Diamond_1 = 'Diamond I (SVIP)',
  Diamond_2 = 'Diamond II (SVIP)',
  Diamond_3 = 'Diamond III (SVIP)'
}

export enum EGamesType {
  ALL_GAME = 1,
  BATTLE_GAME
}
