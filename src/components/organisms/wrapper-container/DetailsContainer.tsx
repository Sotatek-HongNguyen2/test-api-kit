import { Flex } from "antd";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";
import { ArrowOutlinedIcon } from "@/assets/icons/custom-icon";
import { Text } from "@/components/atoms/text";
import { RightOutlined, EditOutlined } from "@ant-design/icons";
import { AppBadge } from "@/components/atoms/badge";
import { WillType } from "@/types";

interface DetailsContainerProps {
  children: React.ReactNode;
  willName: string;
  willType: WillType;
  description: string;
  active: boolean;
}

export const DetailsContainer = (props: DetailsContainerProps) => {
  const { children, willName, willType, description } = props;
  return (
    <Flex vertical className="app-details-container" gap="32px">
      <AppButton type="normal" >
        <Flex gap="16px">
          <ArrowOutlinedIcon />
          <Text size="text-lg" className="font-semibold">Back</Text>
        </Flex>
      </AppButton>
      <Flex vertical gap="24px">
        <Flex vertical gap={4}>
          <Flex gap={8} align="center">
            <Text size="text-xl" className="font-bold neutral-1 capitalize">{willName} details</Text>
            <AppBadge count={<Text size="text-md" className="white capitalize">{willType} will</Text>} color="primary" size="lg" />
          </Flex>
          <Text className="neutral-2">{description}</Text>
        </Flex>
        {children}
      </Flex>
      <Flex justify="space-between" align="center" className="details-container--footer">
        <AppButton size="xl" rightIcon={<RightOutlined />}>
          <Text size="text-lg" className="uppercase neutral-1 font-bold">View smart contract</Text>
        </AppButton>
        <AppButton type="primary" size="xl" icon={<EditOutlined />}>
          <Text size="text-lg" className="uppercase white font-bold">Edit will</Text>
        </AppButton>
      </Flex>
    </Flex>
  )
}