
export type WillType = "inheritance" | "forwarding" | "destruction"

export type WillMethod = "inherited" | "created"

export interface BaseAsset {
  assetIcon: string;
  name: string;
  sign: string;
}
export interface AssetData extends BaseAsset {
  balance: number;
}

export interface AssetDetailData {
  id: number;
  name: string;
  walletAddress: string;
  amount: number;
  fwDetailAsset?: FWDetailAsset[];
}

export type WillStatus = 'open' | 'active';
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