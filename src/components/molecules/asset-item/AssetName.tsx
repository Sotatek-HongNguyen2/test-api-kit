import "./styles.scss";
import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetData, ItemOwnerBalance } from "@/types";
import { LogoETH200 } from "@/assets/icons";

interface AssetNameProps {
  asset?: AssetData;
  showSign?: boolean;
  iconClassName?: string;
  ownerBalance: ItemOwnerBalance[];
}

export const AssetName = (props: AssetNameProps) => {
  const { asset, showSign = true, ownerBalance } = props;
  if (!asset) return null;

  const getToken = () => {
    for (const item of ownerBalance) {
      if (asset.asset === item.address) {
        return (
          <Flex align="center" gap="10px">
            <LogoETH200 />
            <Flex vertical>
              <Text className="font-semibold neutral-1">{item.name}</Text>
              {showSign && <Text className="neutral-2">{item?.symbol}</Text>}
            </Flex>
          </Flex>
        );
      }
    }
    return (
      <Flex align="center" gap="10px">
        <LogoETH200 />
        <Flex vertical>
          <Text className="font-semibold neutral-1">Sepolia</Text>
          {showSign && <Text className="neutral-2">ETH</Text>}
        </Flex>
      </Flex>
    );
  };

  return (
    <Flex align="center" gap="10px">
      {getToken()}
    </Flex>
  );
};
