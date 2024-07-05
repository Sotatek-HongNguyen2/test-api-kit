import "./styles.scss"
import WillImage from "@/components/atoms/Image"
import { Card } from "@/components/atoms/card"
import { Text } from "@/components/atoms/text";
import { useDevices } from "@/hooks/useMediaQuery";
import { Flex } from "antd"

interface TriggerCardProps {
  image: string;
  title: string;
  description: string;
}

export const TriggerCard = ({ image, title, description }: TriggerCardProps) => {
  const { isMobile } = useDevices();
  return (
    <Card boxShadow="none" className="trigger-card">
      <Flex gap={16} align="center">
        <WillImage src={image} />
        <Flex vertical gap={isMobile ? 5 : 8} justify="center">
          <Text className="neutral-1 font-semibold">{title}</Text>
          <Text size={isMobile ? "text-sm" : "text-md"} className="neutral-2">{description}</Text>
        </Flex>
      </Flex>
    </Card>
  )
}