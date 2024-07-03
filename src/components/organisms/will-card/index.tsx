import "./styles.scss";
import { Card, Col, Divider, Flex, Row } from "antd";
import { RightOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { WillData } from "@/types";
import { APP_ROUTES_PATHS } from "@/constants";
import { AppBadge } from "@/components/atoms/badge";
import { useDevices } from "@/hooks/useMediaQuery";

import { Assets } from "./Assets";
import { Beneficiaries } from "./Beneficiaries";
import { WillProgress } from "./WillProgress";
import { WillListProps } from "../wil-tabs/will-list";

interface WillCardProps {
  will: WillData;
  type?: WillListProps["type"];
}

export const WillCard = ({ will, type }: WillCardProps) => {
  const navigate = useNavigate();
  const { isTablet } = useDevices();

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
              {["process", "done"]?.includes(will?.status) &&
              type === "inherited" ? (
                <AppBadge
                  color="secondary"
                  count={
                    <Text size="text-sm" className="font-semibold capitalize">
                      Activated
                    </Text>
                  }
                />
              ) : will?.status === "open" && type === "inherited" ? (
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
        <Divider style={{ margin: "12px 0px" }} />
        {/* <Flex justify="space-between" gap="10px">
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
        </Flex> */}
        <Row gutter={24}>
          <Col md={10} lg={8} xl={8} xxl={6} xs={24} sm={24}>
            <Assets assets={will?.willAsset} will={will} />
          </Col>
          <Col
            md={14}
            lg={16}
            xl={18}
            xs={24}
            xxl={16}
            sm={24}
            className={`${isTablet && "mt-5"}`}
          >
            <Flex vertical className="card-item--right-content" gap="12px">
              <Beneficiaries beneficiaries={will?.willDetail} />
              <Divider style={{ margin: "8px 0px" }} />
              <WillProgress
                activeDate={will?.expTime}
                createdDate={will?.createdAt}
                minimumSignatures={will?.minSignature}
              />
            </Flex>
          </Col>
        </Row>
      </Flex>
    </Card>
  );
};
