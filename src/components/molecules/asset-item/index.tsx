import "./styles.scss";
import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetData } from "@/types";
import useFormattedNumber from "@/hooks/useFormatToken";

import { AssetName } from "./AssetName";

export const AssetItem = ({ asset }: { asset: AssetData }) => {
  const formattedAmount = useFormattedNumber(Number(asset?.amount || 0));

  return (
    <Flex align="center" justify="space-between">
      <AssetName asset={asset} />
      <Flex vertical>
        <Text className="font-semibold neutral-1">
          {asset.amount ? formattedAmount : "0.00"}
        </Text>
      </Flex>
    </Flex>
  );
};
