import "./styles.scss"
import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { WillCard } from "../../will-card"
import { WillFilter } from "./WillFilter"
import { WillData } from "@/types"

interface WillListProps {
  wills: WillData[];
  type?: "created" | "inherited";
}

export const WillList = (props: WillListProps) => {
  const { wills, type } = props;

  const getTitle = () => {
    switch (type) {
      case "inherited":
        return "The following wills have you as a beneficiary and a co-signer:"
      case "created":
        return "This is the list of wills you created:"
      default:
        return "My wills"
    }
  }

  return (
    <Flex gap="5vw" justify="space-between">
      <WillFilter />
      <Flex vertical gap="32px" className="app-will--list">
        <Text size="text-lg">{getTitle()}</Text>
        {
          wills?.map((will) => (
            <WillCard key={`will-item-${will?.willId}`} will={will} />
          ))
        }
      </Flex>

    </Flex>
  )
}