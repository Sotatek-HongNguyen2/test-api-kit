import "./styles.scss";
import { IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text"
import { Card, Divider, Flex } from "antd"
import { RightOutlined } from "@ant-design/icons";
import { Assets } from "./Assets";
import { Beneficiaries } from "./Beneficiaries";
import { WillProgress } from "./WillProgress";
import { WillData } from "@/types";


interface WillCardProps {
  will: WillData;
}

export const WillCard = ({ will }: WillCardProps) => {
  return (
    <Card className="will-card">
      <Flex vertical>
        <Flex align="center" justify="space-between">
          <Flex vertical>
            <Text size="text-xl" className="font-bold">{will?.willName}</Text>
            <Text size="text-md" className="capitalize neutral-2">{will?.willType}</Text>
          </Flex>
          <IconButton>
            <RightOutlined />
          </IconButton>
        </Flex>
        <Divider />
        <Flex justify="space-between" gap="10px">
          <Assets assets={will?.assets} />
          <Flex vertical className="card-item--right-content" gap="12px">
            <Beneficiaries beneficiaries={will?.beneficiaries} />
            <Divider />
            <WillProgress activeDate={will?.activeDate} createdDate={will?.createdDate} minimumSignatures={will?.minimumSignatures} />
          </Flex>
        </Flex>
      </Flex>
    </Card>
  )
}