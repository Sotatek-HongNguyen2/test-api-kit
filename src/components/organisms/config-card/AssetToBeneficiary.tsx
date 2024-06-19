import { Flex } from "antd"
import { CartItemContainer } from "../details-card/CardItemContainer"
import { Text } from "@/components/atoms/text"
import { NoteIcon } from "@/assets/icons/custom-icon"

export const AssetToBeneficiary = () => {
  return (
    <CartItemContainer
      title="Configure asset to beneficiary"
      iconTitle={<NoteIcon />}
    >
      <Flex vertical gap={16}>
        <Text>You’re a designated beneficiary of the following assets:</Text>
      </Flex>
    </CartItemContainer>
  )
}