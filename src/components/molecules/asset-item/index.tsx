import "./styles.scss";
import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetData } from "@/types";

import { AssetName } from "./AssetName";

interface AssetItemProps {
  asset: AssetData;
}
export const AssetItem = ({ asset }: AssetItemProps) => {
  const showBalance = () => {
    return asset?.amount;
  };
  return (
    <Flex align="center" justify="space-between">
      <AssetName asset={asset} />
      <Flex vertical>
        <Text className="font-semibold neutral-1">{showBalance()}</Text>
      </Flex>
    </Flex>
  );
};
