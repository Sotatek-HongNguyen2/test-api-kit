import { NameIcon } from "@/assets/icons/custom-icon"
import WillToast from "@/components/atoms/ToastMessage"
import { AppButton } from "@/components/atoms/button"
import { AppInput } from "@/components/atoms/input"
import { Text } from "@/components/atoms/text"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { EditFormProps } from "@/components/templates/form"
import { WILL_NAME_RULES } from "@/helpers/rule"
import { WillServices } from "@/services/will-service"
import { Flex, Form } from "antd"
import { useState } from "react"
import { useParams } from "react-router-dom"

export const WillName = ({ isEdit }: EditFormProps) => {
  const configForm = Form.useFormInstance();
  const { setFieldValue, getFieldValue, getFieldError } = configForm;
  const { willId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleUpdateName = async () => {
    try {
      setLoading(true);

      if (!willId) {
        WillToast.error("Will not found, please try again later!");
        return;
      }
      const willService = new WillServices();
      const name = getFieldValue("willName");
      const error = getFieldError("willName");
      if (error?.length > 0) {
        WillToast.error(error[0]);
        return;
      }
      const res = await willService.updateWill({
        willId,
        name,
      })
      if (res) {
        WillToast.success("Update will name successfully!");
      }
    } catch (error: any) {
      WillToast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartItemContainer
      title="Will Name"
      iconTitle={<NameIcon />}
    >
      <Flex vertical gap={24}>
        <Form.Item name="willName" rules={WILL_NAME_RULES}>
          <AppInput
            maxLength={30}
            placeholder="Enter will name"
            preventPasteSpecialChar
            onChange={(e) => {
              setFieldValue("willName", e.target.value);
            }}
            onBlur={(e) => {
              const value = e.target.value.trim();
              setFieldValue("willName", value);
            }}
          />
        </Form.Item>
        {
          isEdit ? (
            <AppButton
              type="primary"
              size="xl"
              className="none-styles"
              onClick={handleUpdateName}
              loading={loading}
            >
              <Text className="uppercase" size="text-lg">Save</Text>
            </AppButton>
          ) : null
        }
      </Flex>
    </CartItemContainer>
  );
};
