import { Flex } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetItem } from "@/components/molecules";
import { AssetData, WillData } from "@/types";

import { assetTemp } from "../wil-tabs";

interface AssetsProps {
  assets: AssetData[];
  will: WillData;
}

export const Assets = ({ assets, will }: AssetsProps) => {
  console.log(will);
  return (
    <Flex vertical gap="15px" className="card-item--assets">
      <Text className="font-semibold neutral-1">
        Assets ({will.willAsset.length ?? 0})
      </Text>
      <Flex vertical gap="16px">
        {will.willAsset.map((asset) => (
          // <>áhdgahsj</>
          <AssetItem asset={will} key={`index-${asset.willId}`} />
        ))}
      </Flex>
    </Flex>
  );
};
