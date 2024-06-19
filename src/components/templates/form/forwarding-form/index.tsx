import { AssetToBeneficiary } from "@/components/organisms/config-card/AssetToBeneficiary"
import { ActivationTrigger } from "@/components/organisms/config-card/common-card/ActivationTrigger"
import { ConfigBeneficiaries } from "@/components/organisms/config-card/common-card/ConfigBeneficiaries"
import { NoteToBeneficiaries } from "@/components/organisms/config-card/common-card/NoteToBeneficiaries"
import { WillName } from "@/components/organisms/config-card/common-card/WillName"
import { Flex } from "antd"

export const ForwardingForm = () => {
  return (
    <Flex vertical gap={16}>
      <WillName />
      <ConfigBeneficiaries />
      <AssetToBeneficiary />
      <ActivationTrigger />
      <NoteToBeneficiaries />
    </Flex>
  )
}