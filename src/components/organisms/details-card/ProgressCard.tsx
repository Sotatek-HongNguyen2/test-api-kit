import { Card } from "@/components/atoms/card";
import { WillProgress, WillProgressProps } from "../will-card/WillProgress";
import { WillData, WillMethod } from "@/types";
import { CartItemContainer } from "./CardItemContainer";
import { TriggerIcon } from "@/assets/icons/custom-icon";
import { Flex } from "antd";
import { TriggerCard } from "@/components/molecules/trigger-card";
import NotGoingImage from '../../../../public/images/details/no-outgoing.png'
import NotSignedImage from '../../../../public/images/details/no-signed.png'

interface ProgressCardProps extends WillProgressProps, Pick<WillData, "lackTransaction" | "lackSignMessage"> {
  method: WillMethod;
}

export const ProgressCard = (props: ProgressCardProps) => {
  const { method, lackTransaction, lackSignMessage, ...restProps } = props;

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
                {
                  lackTransaction && lackTransaction > 0 && (
                    <TriggerCard
                      image={NotGoingImage}
                      title={`No outgoing transactions in ${lackTransaction} month${lackTransaction > 1 ? 's' : ''}`}
                      description="You haven’t initiated an outgoing transaction in X months"
                    />
                  )
                }
                {
                  lackSignMessage && lackSignMessage > 0 && (
                    <TriggerCard
                      image={NotSignedImage}
                      title={`No signed messages in ${lackSignMessage} month${lackTransaction > 1 ? 's' : ''}`}
                      description="You haven’t signed a message in X months"
                    />
                  )
                }
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