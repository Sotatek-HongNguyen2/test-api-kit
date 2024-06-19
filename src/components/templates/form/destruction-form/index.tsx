import { ActivationTrigger } from "@/components/organisms/config-card/common-card/ActivationTrigger"
import { AssetDistribution } from "@/components/organisms/config-card/common-card/AssetDistribution"
import { WillName } from "@/components/organisms/config-card/common-card/WillName"
import { Flex } from "antd"

export const DestructionForm = () => {
  return (
    <Flex vertical gap={16}>
      <WillName />
      <AssetDistribution />
      <ActivationTrigger />
    </Flex>
  )
}