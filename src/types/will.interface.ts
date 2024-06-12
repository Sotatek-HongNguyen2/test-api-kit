
export type WillType = "inheritance" | "forwarding" | "destruction"

export interface AssetData {
  assetIcon: string;
  name: string;
  sign: string;
  balance: number;
}

export interface BeneficiaryData {
  name: string;
  walletAddress: string;
}

export interface WillData {
  willId: string | number;
  willName: string;
  willType: WillType;
  assets: AssetData[];
  beneficiaries: BeneficiaryData[];
  activeDate: string;
  createdDate: string;
  minimumSignatures: number;
}