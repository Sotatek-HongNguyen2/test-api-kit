import { Text } from "@/components/atoms/text"
import { AssetItem } from "@/components/molecules";
import { AssetData } from "@/types"
import { Flex } from "antd"
import { assetTemp } from "../wil-tabs";

interface AssetsProps {
  assets: AssetData[];
}

export const Assets = ({ assets }: AssetsProps) => {
  return (
    <Flex vertical gap="15px" className="card-item--assets">
      <Text className="font-semibold neutral-1">Assets ({assetTemp?.length ?? 0})</Text>
      <Flex vertical gap="16px">
        {
          (assetTemp).map((asset) => (
            <AssetItem asset={asset} />
          ))
        }
      </Flex>
    </Flex>
  )
}