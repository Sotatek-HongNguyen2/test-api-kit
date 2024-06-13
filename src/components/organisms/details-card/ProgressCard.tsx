import { Card } from "@/components/atoms/card";
import { WillProgress, WillProgressProps } from "../will-card/WillProgress";
import { WillMethod } from "@/types";
import { CartItemContainer } from "./CardItemContainer";
import { TriggerIcon } from "@/assets/icons/custom-icon";
import { Flex } from "antd";
import { TriggerCard } from "@/components/molecules/trigger-card";
import NotGoingImage from '../../../../public/images/details/no-outgoing.png'
import NotSignedImage from '../../../../public/images/details/no-signed.png'

interface ProgressCardProps extends WillProgressProps {
  method: WillMethod;
}

export const ProgressCard = (props: ProgressCardProps) => {
  const { method, ...restProps } = props;
  console.log('check', import.meta.env.VITE_PUBLIC_URL)
  return (
    <>
      {
        method === "created" ? (
          <CartItemContainer
            title="My activation trigger"
            iconTitle={<TriggerIcon />}
          >
            <Flex vertical gap={24}>
              <WillProgress
                {...restProps}
                title="You have configured to activate your will using Outgoing transaction and Signed transaction ."
              />
              <Flex align="center" justify="space-between" gap={24}>
                <TriggerCard
                  image={NotGoingImage}
                  title="No outgoing transactions in 6 months"
                  description="You haven’t initiated an outgoing transaction in X months"
                />
                <TriggerCard
                  image={NotSignedImage}
                  title="No signed messages in 6 months"
                  description="You haven’t signed a message in X months"
                />
              </Flex>
            </Flex>
          </CartItemContainer>
        ) : (
          <Card boxShadow="large">
            <WillProgress {...restProps} />
          </Card >
        )
      }
    </>
  )
};