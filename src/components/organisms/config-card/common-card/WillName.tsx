import { NameIcon } from "@/assets/icons/custom-icon"
import { AppInput } from "@/components/atoms/input"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Form } from "antd"

export const WillName = () => {
  return (
    <CartItemContainer
      title="Will Name"
      iconTitle={<NameIcon />}
    >
      <Form.Item
        name="willName"
        rules={[{ required: true, message: 'Please input your will name!' }]}
      >
        <AppInput placeholder="Enter will name" />
      </Form.Item>
    </CartItemContainer>
  )
}