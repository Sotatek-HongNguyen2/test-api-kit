import "./styles.scss";
import { Flex } from "antd";
// import { useMemo } from "react";

import { useMemo } from "react";

import { Text } from "@/components/atoms/text";
import { BaseAsset } from "@/types";
import { AssetItemData, AssetType, assetData } from "@/constants/asset";
// import { AssetItemData, assetData } from "@/constants/asset";
import { LogoETH200 } from "@/assets/icons";

interface AssetNameProps {
  asset?: BaseAsset;
  showSign?: boolean;
  iconClassName?: string;
}

export const AssetName = (props: AssetNameProps) => {
  const { asset, showSign = true } = props;
  if (!asset) return null;

  const assetDataItem: AssetItemData = useMemo(
    () => assetData[(asset?.symbol ?? "Sepolia") as AssetType],
    [asset?.symbol]
  );

  return (
    <Flex align="center" gap="10px">
      <Flex align="center" gap="10px" className="app-asset-name">
        {assetDataItem?.logo ?? <LogoETH200 />}
        <Flex vertical>
          <Text className="font-semibold neutral-1">
            {assetDataItem?.name ?? asset?.name}
          </Text>
          {showSign && (
            <Text size="text-sm" className="neutral-2">
              {asset?.symbol ?? "ETH"}
            </Text>
          )}
        </Flex>
      </Flex>
    </Flex>
  );
};
