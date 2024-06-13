import "./styles.scss"
import { Text } from "@/components/atoms/text"
import { AssetData } from "@/types"
import { Flex } from "antd"
import { AssetName } from "./AssetName"

export const AssetItem = ({ asset }: { asset: AssetData }) => {
  return (
    <Flex align="center" justify="space-between">
      <AssetName asset={asset} />
      <Flex vertical>
        <Text className="font-semibold neutral-1">{asset?.balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
      </Flex>
    </Flex>
  )
}