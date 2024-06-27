import { Flex } from "antd";

import { ActivationTrigger } from "@/components/organisms/config-card/common-card/ActivationTrigger";
import { NoteToBeneficiaries } from "@/components/organisms/config-card/common-card/NoteToBeneficiaries";
import { AssetDistribution } from "@/components/organisms/config-card/common-card/AssetDistribution";

import { ConfigBeneficiaries } from "../../../organisms/config-card/common-card/ConfigBeneficiaries";
import { WillName } from "../../../organisms/config-card/common-card/WillName";

export const InHeritanceForm = () => {
  return (
    <Flex vertical gap={16}>
      <WillName />
      <ConfigBeneficiaries />
      <ActivationTrigger />
      <AssetDistribution />
      <NoteToBeneficiaries />
    </Flex>
  );
};
