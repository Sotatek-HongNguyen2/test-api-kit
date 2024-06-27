import { NoteIcon } from "@/assets/icons/custom-icon"
import WillToast from "@/components/atoms/ToastMessage"
import { AppButton } from "@/components/atoms/button"
import { AppInputArea } from "@/components/atoms/input-area"
import { Text } from "@/components/atoms/text"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { EditFormProps } from "@/components/templates/form"
import { WillServices } from "@/services/will-service"
import { Flex, Form } from "antd"
import { useState } from "react"
import { useParams } from "react-router-dom"

export const NoteToBeneficiaries = ({ isEdit }: EditFormProps) => {

  const configForm = Form.useFormInstance();
  const { getFieldValue, getFieldError } = configForm;
  const { willId } = useParams();
  const [loading, setLoading] = useState(false);

  const handleUpdateNote = async () => {
    try {
      setLoading(true);
      if (!willId) {
        WillToast.error("Will not found, please try again later!");
        return;
      }
      const willService = new WillServices();
      const note = getFieldValue("note");
      const error = getFieldError("note");
      if (error?.length > 0) {
        WillToast.error(error[0]);
        return;
      }
      const res = await willService.updateWill({
        willId,
        note,
      })
      if (res) {
        WillToast.success("Updated will note successfully!");
      }
    } catch (error: any) {
      WillToast.error(error?.message);
    } finally {
      setLoading(false);
    }
  }
  return (
    <CartItemContainer
      title="Note to beneficiaries"
      iconTitle={<NoteIcon />}
    >
      <Flex vertical gap={24}>

        <Form.Item
          name="note"
          rules={[
            {
              required: true,
              message: 'Please input your note!'
            },
            {
              max: 2000,
              message: 'Note should not exceed 2000 characters'
            }
          ]}
        >
          <AppInputArea />
        </Form.Item>
        {
          isEdit ? (
            <AppButton
              type="primary"
              size="xl"
              className="none-styles"
              onClick={handleUpdateNote}
              loading={loading}
            >
              <Text className="uppercase" size="text-lg">Save</Text>
            </AppButton>
          ) : null
        }
      </Flex>
    </CartItemContainer>
  )
}