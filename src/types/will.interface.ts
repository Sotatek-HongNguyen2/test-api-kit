export type WillType = "inheritance" | "forwarding" | "destruction";

export type WillMethod = "inherited" | "created";

export interface BaseAsset {
  assetIcon: string;
  name: string;
  sign: string;
}
export interface AssetData extends BaseAsset {
  balance?: number;
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

export type WillStatus = "open" | "active";
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

export interface SaveAssetBody {
  willId: number;
  asset: string;
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
