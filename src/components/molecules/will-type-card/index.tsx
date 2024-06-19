import "./styles.scss";
import { Flex } from "antd";
import clsx from "clsx";

import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { WillTypeItem } from "@/components/organisms/wil-tabs/will-type-modal";

interface WillTypeCardProps extends WillTypeItem {
  onClick: () => void;
  active: boolean;
}

export const WillTypeCard = (props: WillTypeCardProps) => {
  const { icon, title, description, active, onClick } = props;
  return (
    <Card
      boxShadow="none"
      radius="medium"
      className={clsx("will-type-card", active && "selected")}
      onClick={onClick}
    >
      <Flex vertical gap={16}>
        {icon}
        <Flex vertical gap={8}>
          <Text size="text-lg" className="font-semibold">
            {title}
          </Text>
          <Text size="text-sm" className="neutral-2">
            {description}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
};
