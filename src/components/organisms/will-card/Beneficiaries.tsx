import { Text } from "@/components/atoms/text";
import { AssetDetailData } from "@/types";
import { Col, Flex, Row } from "antd";
import { UserOutlined } from "@ant-design/icons";

export const Beneficiaries = ({
  beneficiaries,
}: {
  beneficiaries: AssetDetailData[];
}) => {
  return (
    <Flex vertical gap="12px">
      <Text className="font-semibold">
        Beneficiaries ({beneficiaries?.length ?? 0})
      </Text>
      <Flex gap="30px" className="list-beneficiaries">
        {(beneficiaries ?? []).map((beneficiary, index) => (
          <Flex key={`beneficiary-${index}`} gap="10px">
            <UserOutlined className="user-icon" />
            <Text className="neutral-1">
              {beneficiary?.name && beneficiary?.name !== ""
                ? beneficiary?.name
                : `${beneficiary?.walletAddress?.substring(
                    0,
                    10
                  )}...${beneficiary?.walletAddress?.substring(
                    beneficiary?.walletAddress?.length - 3,
                    beneficiary?.walletAddress?.length
                  )}`}
            </Text>
          </Flex>
        ))}
      </Flex>
      {/* <Row gutter={30}>
        {(beneficiaries ?? []).map((beneficiary, index) => (
          <Col key={`beneficiary-${index}`}>
            <Flex gap={10} align="center" className="py-2">
              <UserOutlined className="user-icon" />
              <Text className="neutral-1">
                {beneficiary?.name && beneficiary?.name !== ""
                  ? beneficiary?.name
                  : `${beneficiary?.walletAddress?.substring(
                      0,
                      10
                    )}...${beneficiary?.walletAddress?.substring(
                      beneficiary?.walletAddress?.length - 3,
                      beneficiary?.walletAddress?.length
                    )}`}
              </Text>
            </Flex>
          </Col>
        ))}
      </Row> */}
    </Flex>
  );
};
