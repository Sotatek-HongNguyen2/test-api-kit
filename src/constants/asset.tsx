import { LogoETH200 } from "@/assets/icons";
import { BaseAsset } from "@/types";

export type AssetType = 'ETH' | 'DAI' | 'WV1' | 'WV2';

export interface AssetItemData {
  icon: React.ReactNode;
  name: string;
}

type AssetData = Record<AssetType, AssetItemData>

export const assetData: AssetData = {
  "ETH": {
    icon: <LogoETH200 />,
    name: 'Ethereum',
  },
  "DAI": {
    icon: <LogoETH200 />,
    name: 'Dai Stablecoin',
  },
  "WV1": {
    icon: <LogoETH200 />,
    name: 'Will V1',
  },
  "WV2": {
    icon: <LogoETH200 />,
    name: 'Will V2',
  },
};

export const assetDataList: BaseAsset[] = (Object.entries(assetData) as [string, AssetItemData][])
  .map(([key, value]) => ({
    symbol: key,
    ...value,
  }));
