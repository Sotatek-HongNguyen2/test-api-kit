import { Text } from "@/components/atoms/text"
import { Card, Flex } from "antd"

export interface WillData {
  willName: string;
}

interface WillCardProps {
  will: WillData;
}

export const WillCard = ({ will }: WillCardProps) => {
  return (
    <Card>
      <Flex vertical>
        <Text size="text-lg">{will?.willName}</Text>
      </Flex>
    </Card>
  )
}