import {
  LogoDAI,
  LogoDAI200,
  LogoETH,
  LogoETH200,
  LogoUSDC,
  LogoUSDC200,
} from "@/assets/icons";
import { BaseAsset } from "@/types";

export type AssetType = "ETH" | "DAI" | "WV1" | "WV2" | "USDC";

export interface AssetItemData {
  icon: React.ReactNode;
  logo: React.ReactNode;
  name: string;
}

type AssetData = Record<AssetType, AssetItemData>;

export const assetData: AssetData = {
  ETH: {
    icon: <LogoETH200 />,
    logo: <LogoETH />,
    name: "Ethereum",
  },
  DAI: {
    icon: <LogoDAI200 />,
    name: "Dai Stablecoin",
    logo: <LogoDAI />,
  },
  USDC: {
    icon: <LogoUSDC200 />,
    name: "USD Coin",
    logo: <LogoUSDC />,
  },
  WV1: {
    icon: <LogoDAI200 />,
    logo: <LogoDAI />,
    name: "Will V1",
  },
  WV2: {
    icon: <LogoUSDC200 />,
    logo: <LogoUSDC />,
    name: "Will V2",
  },
};

export const assetDataList: BaseAsset[] = (
  Object.entries(assetData) as [string, AssetItemData][]
).map(([key, value]) => ({
  symbol: key,
  ...value,
}));
