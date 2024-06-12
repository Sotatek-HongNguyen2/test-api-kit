import { Text } from "@/components/atoms/text"
import { Flex } from "antd"
import { WillCard, WillData } from "../../will-card"

const willsData: WillData[] = [
  {
    willName: 'Inheritance Will'
  }
]

export const MyWill = () => {
  return (
    <Flex vertical gap={24}>
      <Text size="text-md">The following wills have you as a beneficiary and a co-signer.</Text>
      {
        willsData?.map((will, index) => (
          <WillCard will={will} />
        ))
      }
    </Flex>
  )
}