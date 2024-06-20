import { NameIcon } from "@/assets/icons/custom-icon"
import { AppInput } from "@/components/atoms/input"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Form } from "antd"

export const WillName = () => {
  const configForm = Form.useFormInstance();
  const { setFieldValue } = configForm;

  return (
    <CartItemContainer
      title="Will Name"
      iconTitle={<NameIcon />}
    >
      <Form.Item
        name="willName"
        rules={[
          {
            required: true,
            message: 'Please input your will name!'
          },
          {
            max: 31,
            message: 'Will name should not exceed 31 characters'
          },
        ]}
      >
        <AppInput
          placeholder="Enter will name"
          onChange={(e) => {
            setFieldValue("willName", e.target.value);
          }}
          onBlur={(e) => {
            const value = e.target.value.trim();
            setFieldValue("willName", value);
          }}
        />
      </Form.Item>
    </CartItemContainer>
  )
}