import "./styles.scss";
import { Card, Divider, Flex } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { WillData } from "@/types";
import { APP_ROUTES_PATHS } from "@/constants";

import { Assets } from "./Assets";
import { Beneficiaries } from "./Beneficiaries";
import { WillProgress } from "./WillProgress";

interface WillCardProps {
  will: WillData;
}

export const WillCard = ({ will }: WillCardProps) => {
  const navigate = useNavigate();
  return (
    <Card
      className="will-card"
      onClick={() => navigate(`${APP_ROUTES_PATHS.DETAIL_WILL}/${will?.id}`)}
    >
      <Flex vertical className="">
        <Flex align="center" justify="space-between">
          <Flex vertical>
            <Text size="text-xl" className="font-bold">
              {will?.name}
            </Text>
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
