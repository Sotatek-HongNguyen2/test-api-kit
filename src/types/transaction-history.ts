export enum ECoinTokenList {
  ETH = 'ETH',
  BTC = 'BTC',
  LTC = 'LTC',
  USDT = 'USDT'
}

export enum ESystemNetwork {
  BITCOIN = 'BITCOIN',
  BNB = 'BNB_SMART_CHAIN',
  ETHEREUM = 'ETHEREUM' ,
  LITECOIN = 'LITECOIN',
  SOLANA = 'SOLANA',
  POLYGON = 'POLYGON',
  AVALANCHE = 'AVALANCHE',
  ARBITRUM = 'ARBITRUM',
  TRON = 'TRON'
}

export const SYSTEM_NETWORK_BY_TOKEN = {
  [ECoinTokenList.BTC]: ESystemNetwork.BITCOIN,
  [ECoinTokenList.ETH]: ESystemNetwork.ETHEREUM,
  [ECoinTokenList.USDT]: ESystemNetwork.ETHEREUM,
  [ECoinTokenList.LTC]: ESystemNetwork.LITECOIN
};

export const NETWORK_ABBRE = {
  [ESystemNetwork.ETHEREUM]: ECoinTokenList.ETH,
  [ESystemNetwork.BITCOIN]: ECoinTokenList.BTC,
  [ESystemNetwork.LITECOIN]: ECoinTokenList.LTC,
  [ESystemNetwork.ARBITRUM]: ESystemNetwork.ARBITRUM,
  [ESystemNetwork.TRON]: ESystemNetwork.TRON
};

export const NETWORK_LABELS = {
  [ESystemNetwork.BITCOIN]: 'Bitcoin',
  [ESystemNetwork.ETHEREUM]: 'Ethereum',
  [ESystemNetwork.ARBITRUM]: 'Arbitrum',
  [ESystemNetwork.AVALANCHE]: 'Avalance',
  [ESystemNetwork.BNB]: 'BNB Smart Chain',
  [ESystemNetwork.POLYGON]: 'Polygon',
  [ESystemNetwork.LITECOIN]: 'Litecoin',
  [ESystemNetwork.SOLANA]: 'Solana',
  [ESystemNetwork.TRON]: 'Tron'
};

export enum ETransactionHistoryStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  FAILED = 'FAILED',
  WAITING_TO_APPROVE = 'WAITING_TO_APPROVE',
  PROCESSING = 'PROCESSING'
}

export type TTransactionHistoryRes = {
  blockTime: number;
  networkFeeAmount: string;
  status: ETransactionHistoryStatus;
  tokenAmount: string;
  tokenSymbol: string;
  tokenUsd: string;
  txUuid: string;
  network: string;
};

export type TTransactionHistoryDetailRes = {
  txUuid: string;
  blockTime: number;
  tokenAmount: string;
  tokenSymbol: string;
  tokenUsd: string;
  networkFeeUsd: string;
  status: ETransactionHistoryStatus;
  txHash: string;
  from: string;
  to: string;
  network: string;
  explorerUrl: string;
};
