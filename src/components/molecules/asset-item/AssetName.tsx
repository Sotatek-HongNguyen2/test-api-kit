import "./styles.scss";
import { Text } from "@/components/atoms/text"
import { AssetData } from "@/types"
import { Flex } from "antd"

export const AssetName = ({ asset }: { asset: AssetData }) => {
  return (
    <Flex align="center" gap="10px">
      <img src={asset?.assetIcon} alt="asset-icon" className="asset-icon" />
      <Flex vertical>
        <Text className="font-semibold neutral-1">{asset?.name}</Text>
        <Text className="neutral-2">{asset?.sign}</Text>
      </Flex>
    </Flex>
  )
}