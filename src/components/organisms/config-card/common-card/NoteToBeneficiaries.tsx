import { NoteIcon } from "@/assets/icons/custom-icon"
import { AppInputArea } from "@/components/atoms/input-area"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Form } from "antd"

export const NoteToBeneficiaries = () => {
  return (
    <CartItemContainer
      title="Note to beneficiaries"
      iconTitle={<NoteIcon />}
    >
      <Form.Item
        name="note"
      >
        <AppInputArea />
      </Form.Item>
    </CartItemContainer>
  )
}