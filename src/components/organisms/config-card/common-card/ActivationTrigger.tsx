import { AttentionIcon, TriggerIcon } from "@/assets/icons/custom-icon"
import { CartItemContainer } from "../../details-card/CardItemContainer"
import { Flex, Form } from "antd"
import { Text } from "@/components/atoms/text"
import { CheckboxGroup, CustomCheckboxItemProps } from "@/components/molecules/checkbox-group"
import { SelectTime } from "@/components/molecules/select-time"
import { useState } from "react"

export const ActivationTrigger = ({ type }: { type?: 'destruction' }) => {

  const configForm = Form.useFormInstance();
  const { setFieldValue } = configForm;
  const [selected, setSelected] = useState<string[]>([]);

  const configOptions: CustomCheckboxItemProps[] = [
    {
      id: 1,
      title: "Lack of outgoing transactions",
      value: 'lack_outgoing_transactions',
      itemChildren: <Form.Item
        name="lackOfOutgoingTxRange"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <SelectTime
          title="Time of inactivity until will activation"
          handleChangeValue={(value) => setFieldValue('lackOfOutgoingTxRange', value)}
        />
      </Form.Item>
    },
    {
      id: 2,
      title: "Lack of signed message",
      value: 'lack_signed_message',
      itemChildren: <Form.Item
        name="lackOfSignedMsgRange"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <SelectTime
          title="Time of inactivity until will activation"
          handleChangeValue={(value) => setFieldValue('lackOfSignedMsgRange', value)}
        />
      </Form.Item>
    }
  ]

  return (
    <CartItemContainer
      title="Configure activation trigger"
      iconTitle={<TriggerIcon />}
    >
      <Flex vertical gap={24}>
        <Flex vertical gap={16}>
          <Text className="neutral-1">Select one or both</Text>
          <Form.Item
            name="activationTrigger"
            rules={[{ required: true, message: 'Please select an option' }]}
          >
            <CheckboxGroup items={configOptions} onChange={(value) => setSelected(value as string[])} />
          </Form.Item>
        </Flex>
        {
          type && type === "destruction" && selected?.length === 2 && (
            <Flex align="flex-start" gap={10}>
              <AttentionIcon />
              <Text className="neutral-2">You’ve selected both lack of outgoing transactions and signed transactions as your trigger. Both conditions will need to be met for your will to be activated. Once one of the two activities is authorized, your activation duration will be reset.</Text>
            </Flex>
          )
        }
      </Flex>
    </CartItemContainer >
  )
}