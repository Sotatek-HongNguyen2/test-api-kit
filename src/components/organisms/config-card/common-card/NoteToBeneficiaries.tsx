import { NoteIcon } from "@/assets/icons/custom-icon";
import { AppInputArea } from "@/components/atoms/input-area";
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer";
import { Form } from "antd";

export const NoteToBeneficiaries = () => {
  const configForm = Form.useFormInstance();
  const { setFieldValue } = configForm;
  return (
    <CartItemContainer title="Note to beneficiaries" iconTitle={<NoteIcon />}>
      <Form.Item
        name="note"
        rules={[
          {
            max: 2000,
            message: "Note should not exceed 2000 characters",
          },
        ]}
      >
        <AppInputArea
          onChange={(e) => {
            const newValue = e.target.value.trimStart();
            setFieldValue("note", newValue);
          }}

          onBlur={(e) => {
            const newValue = e.target.value.trim();
            if (newValue) {
              setFieldValue("note", newValue)
            }
          }}
          maxLength={2000}
        />
      </Form.Item>
    </CartItemContainer>
  );
};
