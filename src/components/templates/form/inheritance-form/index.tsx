import { Flex } from "antd";
import { WillName } from "../../../organisms/config-card/common-card/WillName";
import { ConfigBeneficiaries } from "../../../organisms/config-card/common-card/ConfigBeneficiaries";
import { ActivationTrigger } from "@/components/organisms/config-card/common-card/ActivationTrigger";
import { NoteToBeneficiaries } from "@/components/organisms/config-card/common-card/NoteToBeneficiaries";
import { AssetDistribution } from "@/components/organisms/config-card/common-card/AssetDistribution";
import { EditFormProps } from "..";
import { EditAssetDistribution } from "@/components/organisms/config-card/common-card/EditAssetDistribution";

export const InHeritanceForm = (props: EditFormProps) => {
  const { isEdit } = props;
  return (
    <Flex vertical gap={16}>
      <WillName {...props} />
      {
        isEdit ? (
          <>
            <ConfigBeneficiaries {...props} />
            <EditAssetDistribution {...props} />
            <ActivationTrigger {...props} />
          </>
        ) : (
          <>
            <ConfigBeneficiaries />
            <ActivationTrigger />
            <AssetDistribution />
          </>
        )
      }
      <NoteToBeneficiaries {...props} />
    </Flex>
  )
};