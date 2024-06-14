
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

export type AssetPercentData = BaseAsset & { percentage: number }

export interface BeneficiaryData {
  id: string | number;
  name: string;
  walletAddress: string;
  percentage: AssetPercentData[];
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
  totalSignatures: number;
  noteToBeneficiaries?: string;
  method: WillMethod;
  active: boolean;
}