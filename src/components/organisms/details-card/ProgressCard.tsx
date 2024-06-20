import { Card } from "@/components/atoms/card";
import { WillProgress, WillProgressProps } from "../will-card/WillProgress";
import { WillData, WillMethod } from "@/types";
import { CartItemContainer } from "./CardItemContainer";
import { TriggerIcon } from "@/assets/icons/custom-icon";
import { Flex } from "antd";
import { TriggerCard } from "@/components/molecules/trigger-card";
import NotGoingImage from '../../../../public/images/details/no-outgoing.png'
import NotSignedImage from '../../../../public/images/details/no-signed.png'
import { useGetDiffMonth } from "@/hooks/useGetDiffMonths";

interface ProgressCardProps extends WillProgressProps, Pick<WillData, "lackTransaction" | "lackSignMessage" | "owner"> {
  method: WillMethod;
}

export const ProgressCard = (props: ProgressCardProps) => {
  const { method, lackTransaction, lackSignMessage, owner, ...restProps } = props;

  const { lastTxTime, lastLoginTime } = owner;

  const getTimeMonths = (time: number | null) => {
    if (time === null || time === undefined) return "_ months";
    return time > 1 ? `${time} months` : `${time} month`;
  }

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
                      title={`No outgoing transactions in ${getTimeMonths(lackTransaction)}`}
                      description={`You haven’t initiated an outgoing transaction in ${getTimeMonths(useGetDiffMonth(lastTxTime))}`}
                    />
                  )
                }
                {
                  lackSignMessage && lackSignMessage > 0 && (
                    <TriggerCard
                      image={NotSignedImage}
                      title={`No signed messages in ${getTimeMonths(lackSignMessage)}`}
                      description={`You haven’t signed a message in ${getTimeMonths(useGetDiffMonth(lastLoginTime))}`}
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