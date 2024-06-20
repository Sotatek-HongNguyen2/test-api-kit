import "./styles.scss";
import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetData, ItemOwnerBalance } from "@/types";
import useFormattedNumber from "@/hooks/useFormatToken";

import { AssetName } from "./AssetName";

interface AssetItemProps {
  asset: AssetData;
  ownerBalance: ItemOwnerBalance[];
}
export const AssetItem = ({ asset, ownerBalance }: AssetItemProps) => {
  const formattedAmount = useFormattedNumber(Number(asset?.amount || 0));

  return (
    <Flex align="center" justify="space-between">
      <AssetName ownerBalance={ownerBalance} asset={asset} />
      <Flex vertical>
        <Text className="font-semibold neutral-1">
          {asset.amount ? formattedAmount : "0.0"}
        </Text>
      </Flex>
    </Flex>
  );
};
