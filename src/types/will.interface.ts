export type WillType = "inheritance" | "forwarding" | "destruction";
export type TokenWillType = "WV1" | "WV2";

export type WillMethod = "inherited" | "created";

export interface BaseAsset {
  icon: React.ReactNode;
  name: string;
  symbol: string;
}
export interface AssetData extends BaseAsset {
  balance?: string;
  amount: string | null;
  asset: string;
  willId: string | number;
}

export interface AssetDetailData {
  id: number;
  name: string;
  walletAddress: string;
  amount: number;
  fwDetailAsset?: FWDetailAsset[];
}

export interface OwnerLastTime {
  lastLoginTime: string;
  lastTxTime: string;
  walletAddress: string;
}

export type WillStatus = "open" | "process" | "done" | "delete";
export interface WillData {
  id: string | number;
  name: string;
  type: WillType;
  ownerAddress: string;
  txHash: string;
  willAsset: AssetData[];
  willDetail: AssetDetailData[];
  expTime: string;
  createdAt: string;
  minSignature: number;
  note?: string;
  status: WillStatus;
  willSignature: any[]; // signed signatures
  ownerBalance: ItemOwnerBalance[];
  lackSignMessage: number;
  lackTransaction: number;
  owner: OwnerLastTime;
  scWillId: string;
  address: string; // will address
}

export interface ItemOwnerBalance {
  address: string;
  balance: string;
  name: string;
  symbol: string;
  willSignature: any[]; // signed signatures;
  lackSignMessage: number;
  lackTransaction: number;
}

export interface UpdateWillBody {
  willId: string;
  willName?: string;
  note?: string;
}

export interface BeneficiaryData {
  id: number;
  name: string;
  address: string;
  percentage?: number;
}

export interface FWDetailAsset {
  asset: string;
  percent: string;
}
