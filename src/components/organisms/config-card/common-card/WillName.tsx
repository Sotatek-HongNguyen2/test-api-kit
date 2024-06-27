import { Form } from "antd";

import { NameIcon } from "@/assets/icons/custom-icon";
import { AppInput } from "@/components/atoms/input";
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer";
import { WILL_NAME_RULES } from "@/helpers/rule";

export const WillName = () => {
  const configForm = Form.useFormInstance();
  const { setFieldValue } = configForm;

  return (
    <CartItemContainer title="Will Name" iconTitle={<NameIcon />}>
      <Form.Item name="willName" rules={WILL_NAME_RULES}>
        <AppInput
          maxLength={30}
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
  );
};
