import {
  LogoDAI200,
  LogoETH200,
  LogoUSDC200,
} from "@/assets/icons";
import { DaiIcon, EthIcon, UsdcIcon } from "@/assets/icons/custom-icon";
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
    logo: <EthIcon />,
    name: "Ethereum",
  },
  DAI: {
    icon: <LogoDAI200 />,
    name: "Dai Stablecoin",
    logo: <DaiIcon />,
  },
  USDC: {
    icon: <LogoUSDC200 />,
    name: "USD Coin",
    logo: <UsdcIcon />,
  },
  WV1: {
    icon: <LogoDAI200 />,
    logo: <DaiIcon />,
    name: "Will V1",
  },
  WV2: {
    icon: <LogoUSDC200 />,
    logo: <UsdcIcon />,
    name: "Will V2",
  },
};

export const assetDataList: BaseAsset[] = (
  Object.entries(assetData) as [string, AssetItemData][]
).map(([key, value]) => ({
  symbol: key,
  ...value,
}));
