import { Flex } from "antd";
import { WillName } from "../../../organisms/config-card/common-card/WillName";
import { ConfigBeneficiaries } from "../../../organisms/config-card/common-card/ConfigBeneficiaries";
import { ActivationTrigger } from "@/components/organisms/config-card/common-card/ActivationTrigger";
import { NoteToBeneficiaries } from "@/components/organisms/config-card/common-card/NoteToBeneficiaries";
import { AssetDistribution } from "@/components/organisms/config-card/common-card/AssetDistribution";

export const InHeritanceForm = () => {

  return (
    <Flex vertical gap={16}>
      <WillName />
      <ConfigBeneficiaries />
      <ActivationTrigger />
      <AssetDistribution />
      <NoteToBeneficiaries />
    </Flex>
  )
};