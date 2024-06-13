import "./styles.scss"
import WillImage from "@/components/atoms/Image"
import { Card } from "@/components/atoms/card"
import { Text } from "@/components/atoms/text";
import { Flex } from "antd"

interface TriggerCardProps {
  image: string;
  title: string;
  description: string;
}

export const TriggerCard = ({ image, title, description }: TriggerCardProps) => {
  return (
    <Card boxShadow="none" className="trigger-card">
      <Flex gap={16}>
        <WillImage src={image} />
        <Flex vertical gap={8}>
          <Text className="neutral-1 font-semibold">{title}</Text>
          <Text className="neutral-2">{description}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}