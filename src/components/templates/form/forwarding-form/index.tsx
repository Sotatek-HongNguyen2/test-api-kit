import { AssetToBeneficiary } from "@/components/organisms/config-card/AssetToBeneficiary"
import { ActivationTrigger } from "@/components/organisms/config-card/common-card/ActivationTrigger"
import { ConfigBeneficiaries } from "@/components/organisms/config-card/common-card/ConfigBeneficiaries"
import { NoteToBeneficiaries } from "@/components/organisms/config-card/common-card/NoteToBeneficiaries"
import { WillName } from "@/components/organisms/config-card/common-card/WillName"
import { Flex } from "antd"
import { EditFormProps } from ".."
import { EditConfigCard } from "@/components/organisms/config-card/EditConfigCard"

export const ForwardingForm = (props: EditFormProps) => {
  const { isEdit } = props;
  return (
    <Flex vertical gap={16}>
      <WillName {...props} />
      {
        isEdit ? (
          <>
            <EditConfigCard {...props} />
            <ActivationTrigger {...props} />
          </>
        ) : (
          <>
            <ConfigBeneficiaries />
            <AssetToBeneficiary />
            <ActivationTrigger />
          </>
        )
      }
      <NoteToBeneficiaries {...props} />
    </Flex>
  )
}