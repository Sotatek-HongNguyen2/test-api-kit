import willV1Contract from "@/models/contract/evm/willV1Contract";
import willV2Contract from "@/models/contract/evm/willV2Contract";

export type WillType = "inheritance" | "forwarding" | "destruction";
export type TokenWillType = "USDC" | "DAI";

export const TOKEN_LIST = {
  USDC: {
    NAME: "USDC",
    ABI: willV1Contract,
  },
  DAI: {
    NAME: "DAI",
    ABI: willV2Contract,
  },
};

export type WillMethod = "inherited" | "created";

export interface BaseAsset {
  icon: React.ReactNode;
  logo?: React.ReactNode;

  name: string;
  symbol: string;
}
export interface AssetData extends BaseAsset {
  balance?: string;
  amount: string | null | React.ReactNode;
  asset: string;
  willId: string | number;
}

export interface AssetDetailData {
  id: number;
  name: string;
  walletAddress: string;
  amount: number;
  fwDetailAsset?: FWDetailAsset[];
  user: null | {
    avatar: string;
    name: string;
  };
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
  willBalance: string;
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
  name?: string;
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
