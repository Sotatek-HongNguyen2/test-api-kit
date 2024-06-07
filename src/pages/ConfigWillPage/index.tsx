import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import { Flex } from "antd";

export function ConfigWillPage() {
  return (
    <WrapperContainer title="Configure your will" backTitle="Back to dashboard">
      <Flex vertical gap="5vh">
        <WillTypeCard />
        <WillForm />
      </Flex>
    </WrapperContainer>
  );
};
