import { Flex } from "antd";
import { useMemo } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

import { Card } from "@/components/atoms/card";
import { DiamondIcon } from "@/assets/icons/custom-icon";
import { Text } from "@/components/atoms/text";
import { APP_ROUTES_PATHS } from "@/constants";
import { WillType } from "@/types";

interface WillTypeCardProps {
  type?: WillType;
}

export const WillTypeCard = ({ type }: WillTypeCardProps) => {
  const { willType: willTypeParams } = useParams<{ willType: WillType }>();
  const willType = willTypeParams || type;
  const location = useLocation();

  if (
    !willType ||
    (willType &&
      !["inheritance", "forwarding", "destruction"].includes(willType))
  ) {
    return (
      <Navigate state={{ from: location }} to={APP_ROUTES_PATHS.HOME} replace />
    );
  }

  const willTypeData = useMemo(() => {
    if (willType === "inheritance")
      return {
        title: "Inheritance",
        description: (
          <Flex vertical>
            <Text size="text-sm" className="neutral-2">
              When activated, your fund will be deposited into the Safe wallet.
            </Text>
            <Text size="text-sm" className="neutral-2">
              A minimum number of co-signatures will be required for
              beneficiaries to claim the fund in Safe.
            </Text>
          </Flex>
        ),
      };
    if (willType === "forwarding")
      return {
        title: "Forwarding",
        description:
          "When activated, assets will be sent directly to the public addresses of listed beneficiaries based on your designated allocation below.",
      };
    if (willType === "destruction")
      return {
        title: "Destruction",
        description:
          "When activated, all assets will be sent to the Ethereum genesis address, thus destroyed permanently.",
      };
  }, [willType]);

  return (
    <Card>
      <Flex gap={20}>
        <DiamondIcon />
        <Flex vertical gap={10}>
          <Text size="text-lg" className="font-semibold neutral-1">
            {willTypeData?.title}
          </Text>
          {willTypeData?.description &&
          typeof willTypeData?.description === "string" ? (
            <Text size="text-sm" className="neutral-2">
              {willTypeData?.description}
            </Text>
          ) : (
            willTypeData?.description
          )}
        </Flex>
      </Flex>
    </Card>
  );
};
