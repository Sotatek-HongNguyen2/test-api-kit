import { BottomIcon } from "@/assets/icons/custom-icon";
import "./styles.scss";
import { Card } from "@/components/atoms/card"
import { Text } from "@/components/atoms/text";
import { AppTooltip } from "@/components/atoms/tooltip";
import { Divider, Flex, TooltipProps } from "antd";
import useDisclosure from "@/hooks/useDisclosure";
import clsx from "clsx";

export interface CardDisclosureProps {
  isDisclosure?: boolean;
  hasIcon?: boolean;
}

interface CardItemContainerProps extends CardDisclosureProps {
  children: React.ReactNode;
  title: string;
  iconTitle: React.ReactNode;
  hasTooltip?: false | TooltipProps;
}

export const CartItemContainer = (props: CardItemContainerProps) => {
  const {
    children,
    title,
    iconTitle,
    hasTooltip = false,
    isDisclosure = false,
    hasIcon = true
  } = props;
  const { isOpen, onToggle } = useDisclosure();
  return (
    <Card boxShadow="large" className={clsx("card-item--container", isDisclosure && "cart-item--container--disclosure")}>
      <Flex vertical>
        <Flex
          gap={12}
          align="center"
          justify="space-between"
          {
          ...(isDisclosure && { onClick: onToggle })
          }
        >
          <Flex
            gap={12}
            align="center"
          >
            {
              hasIcon && (
                <Flex className="icon-title" justify="center" align="center">
                  {iconTitle}
                </Flex>
              )
            }
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
          {
            isDisclosure && (
              <BottomIcon className={clsx("icon-disclosure", isOpen && "visible")} />
            )
          }
        </Flex>
        <Flex vertical className={clsx("cart-item--children", isDisclosure && "children--hide", isOpen && "visible")}>
          <Divider />
          {children}
        </Flex>
      </Flex>
    </Card>
  )
}