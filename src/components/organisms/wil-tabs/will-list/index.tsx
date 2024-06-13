import "./styles.scss"
import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { WillCard } from "../../will-card"
import { WillFilter } from "./WillFilter"
import { WillData } from "@/types"
import AppPagination from "@/components/molecules/Pagination"

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
    <Flex justify="space-between" gap="5vw">
      <WillFilter />
      <Flex vertical gap="5vh" className="app-will--list">
        <Flex vertical gap="32px">
          <Text size="text-lg">{getTitle()}</Text>
          {
            wills?.map((will) => (
              <WillCard key={`will-item-${will?.willId}`} will={will} />
            ))
          }
        </Flex>
        <Flex justify="flex-end">
          <AppPagination total={200} />
        </Flex>
      </Flex>
    </Flex>
  )
}