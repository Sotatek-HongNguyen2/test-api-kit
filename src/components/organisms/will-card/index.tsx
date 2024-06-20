import "./styles.scss";
import { Card, Divider, Flex } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { WillData } from "@/types";
import { APP_ROUTES_PATHS } from "@/constants";
import { AppBadge } from "@/components/atoms/badge";

import { Assets } from "./Assets";
import { Beneficiaries } from "./Beneficiaries";
import { WillProgress } from "./WillProgress";
import { WillListProps } from "../wil-tabs/will-list";

interface WillCardProps {
  will: WillData;
  type: WillListProps["type"];
}

export const WillCard = ({ will, type }: WillCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className="will-card"
      onClick={() => navigate(`${APP_ROUTES_PATHS.DETAIL_WILL}/${will?.id}`)}
    >
      <Flex vertical className="">
        <Flex align="center" justify="space-between">
          <Flex vertical>
            <Flex gap={6} align="center">
              <Text size="text-xl" className="font-bold">
                {will?.name}
              </Text>
              {will?.status === "active" ? (
                <AppBadge
                  color="secondary"
                  count={
                    <Text size="text-sm" className="font-semibold capitalize">
                      Activated
                    </Text>
                  }
                />
              ) : will?.status === "open" ? (
                <AppBadge
                  color="error"
                  count={
                    <Text size="text-sm" className="font-semibold capitalize">
                      Not activated
                    </Text>
                  }
                />
              ) : null}
            </Flex>
            <Text size="text-md" className="capitalize neutral-2">
              {will?.type}
            </Text>
          </Flex>
          <IconButton>
            <RightOutlined />
          </IconButton>
        </Flex>
        <Divider />
        <Flex justify="space-between" gap="10px">
          <Assets assets={will?.willAsset} will={will} />
          <Flex vertical className="card-item--right-content" gap="12px">
            <Beneficiaries beneficiaries={will?.willDetail} />
            <Divider />
            <WillProgress
              activeDate={will?.expTime}
              createdDate={will?.createdAt}
              minimumSignatures={will?.minSignature}
            />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};
