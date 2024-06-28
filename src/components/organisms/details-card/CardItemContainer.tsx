import "./styles.scss";
import { Card } from "@/components/atoms/card"
import { Text } from "@/components/atoms/text";
import { AppTooltip } from "@/components/atoms/tooltip";
import { Divider, Flex, TooltipProps } from "antd";

interface CardItemContainerProps {
  children: React.ReactNode;
  title: string;
  iconTitle: React.ReactNode;
  hasTooltip?: false | TooltipProps;
}

export const CartItemContainer = (props: CardItemContainerProps) => {
  const { children, title, iconTitle, hasTooltip = false } = props;
  return (
    <Card boxShadow="large">
      <Flex vertical>
        <Flex gap={12} align="center">
          <Flex className="icon-title" justify="center" align="center">
            {iconTitle}
          </Flex>
          <Flex gap={4} align="center">
            <Text
              size="text-lg"
              className="font-semibold neutral-1"
            >
              {title}
            </Text>
            {
              hasTooltip && (
                <AppTooltip {...hasTooltip} />
              )
            }
          </Flex>
        </Flex>
        <Divider />
        {children}
      </Flex>
    </Card>
  )
}