import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetItem } from "@/components/molecules";
import { AssetData, WillData } from "@/types";

interface AssetsProps {
  assets: AssetData[];
  will: WillData;
}

export const Assets = ({ will }: AssetsProps) => {
  return (
    <Flex vertical gap="15px" className="card-item--assets">
      <Text className="font-semibold neutral-1">
        Assets ({will.willAsset.length ?? 0})
      </Text>
      <Flex vertical gap="16px">
        {will.willAsset.map((asset) => (
          <AssetItem
            asset={asset}
            ownerBalance={will.ownerBalance}
            key={`index-${asset.willId}`}
          />
        ))}
      </Flex>
    </Flex>
  );
};
