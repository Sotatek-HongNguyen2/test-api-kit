import "./styles.scss";
import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetData, ItemOwnerBalance } from "@/types";
import useFormattedNumber from "@/hooks/useFormatToken";
import { getWalletSlice, useAppSelector } from "@/store";

import { AssetName } from "./AssetName";

interface AssetItemProps {
  asset: AssetData;
  ownerBalance: ItemOwnerBalance[];
}
export const AssetItem = ({ asset, ownerBalance }: AssetItemProps) => {
  const { balance } = useAppSelector(getWalletSlice);

  const formattedAmount = useFormattedNumber(Number(asset?.amount || 0));
  const str = useFormattedNumber(Number(balance));
  const getAmount = () => {
    console.log(formattedAmount, balance);
    if (Number(asset?.amount) > Number(balance)) {
      return str;
    }
    return formattedAmount;
  };
  return (
    <Flex align="center" justify="space-between">
      <AssetName ownerBalance={ownerBalance} asset={asset} />
      <Flex vertical>
        <Text className="font-semibold neutral-1">
          {asset.amount ? getAmount() : "0.0"}
        </Text>
      </Flex>
    </Flex>
  );
};
