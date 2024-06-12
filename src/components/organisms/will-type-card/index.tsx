import { Card } from "@/components/atoms/card";
import { ConfigIcon } from "@/assets/icons/custom-icon";
import { Text } from "@/components/atoms/text";
import { APP_ROUTES_PATHS } from "@/constants";
import { Flex } from "antd";
import { useMemo } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom"

export type WillType = "inheritance" | 'forwarding' | 'destruction'

export const WillTypeCard = () => {
  const { willType } = useParams<{ willType: WillType }>();
  const location = useLocation();

  if (!willType || (willType && !['inheritance', 'forwarding', 'destruction'].includes(willType))) {
    return (
      <Navigate
        state={{ from: location }}
        to={APP_ROUTES_PATHS.HOME}
        replace
      />
    )
  }

  const willTypeData = useMemo(() => {
    if (willType === 'inheritance')
      return {
        title: "Inheritance",
        description: "When activated, a minimum number of co-signatures will be required for beneficiaries to access your wallet."
      }
    if (willType === 'forwarding')
      return {
        title: "Forwarding",
        description: "When activated, assets will be sent directly to the public addresses of listed beneficiaries based on your designated allocation below."
      }
    if (willType === 'destruction')
      return {
        title: "Destruction",
        description: "When activated, all assets will be sent to the Ethereum genesis address, thus destroyed permanently."
      }
  }, [willType])

  return (
    <Card>
      <Flex vertical gap={20}>
        <Flex gap={10} align="center">
          <ConfigIcon />
          <Text>{willTypeData?.title}</Text>
        </Flex>
        <Text>{willTypeData?.description}</Text>
      </Flex>
    </Card>
  )
}