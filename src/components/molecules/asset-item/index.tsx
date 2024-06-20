import "./styles.scss";
import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetData, ItemOwnerBalance } from "@/types";
// import useFormattedNumber from "@/hooks/useFormatToken";
// import { getWalletSlice, useAppSelector } from "@/store";

import { AssetName } from "./AssetName";

interface AssetItemProps {
  asset: AssetData;
  ownerBalance: ItemOwnerBalance[];
}
export const AssetItem = ({ asset, ownerBalance }: AssetItemProps) => {
  // const { balance } = useAppSelector(getWalletSlice);

  const formatNumber = (number: number): string => {
    const numberStr = number.toString();
    const parts = numberStr.split(".");
    let integerPart = parts[0];
    let decimalPart = parts[1] || "00";
    decimalPart = decimalPart.substring(0, 2);
    integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return `${integerPart}.${decimalPart}`;
  };

  // const formattedAmount = useFormattedNumber(Number(asset?.amount || 0));
  // const str = useFormattedNumber(Number(balance));
  const getAmount = () => {
    for (const item of ownerBalance ?? []) {
      if (asset.asset === item.address) {
        if (Number(asset?.amount) > Number(item.balance)) {
          return formatNumber(Number(item.balance));
        }
        return formatNumber(Number(asset?.amount));
      }
    }
    return "0.0";
    // console.log(formattedAmount, balance);
    // if (Number(asset?.amount) > Number(balance)) {
    //   return str;
    // }
    // return formattedAmount;
  };
  return (
    <Flex align="center" justify="space-between">
      <AssetName ownerBalance={ownerBalance} asset={asset} />
      <Flex vertical>
        <Text className="font-semibold neutral-1">{getAmount()}</Text>
      </Flex>
    </Flex>
  );
};
