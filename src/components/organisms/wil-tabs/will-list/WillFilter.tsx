import { Text } from "@/components/atoms/text"
import { CustomRadioItemProps, RadioGroup } from "@/components/molecules/radio-group"
import { SearchInput } from "@/components/molecules/search-input"
import { Flex } from "antd"

const items: CustomRadioItemProps[] = [
  {
    id: 1,
    title: 'All',
    value: 'all'
  },
  {
    id: 2,
    title: "Inheritance",
    value: "inheritance"
  },
  {
    id: 3,
    title: "Forwarding",
    value: "forwarding"
  },
  {
    id: 4,
    title: "Destruction",
    value: "destruction"
  }
]

export const WillFilter = () => {
  return (
    <Flex vertical className="will-filter--container" gap="24px">
      <SearchInput placeholder="Search by will name" onHandleSearch={() => { }} />
      <RadioGroup title="Type" items={items} />
    </Flex>
  )
}