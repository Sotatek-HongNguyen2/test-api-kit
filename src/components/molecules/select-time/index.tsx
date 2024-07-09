import "./styles.scss";
import { Text } from "@/components/atoms/text";
import { Flex, Form } from "antd";
import { RadioGroup } from "../radio-group";
import { AppInput } from "@/components/atoms/input";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { WILL_NAME_RULES } from "@/helpers/rule";

interface SelectTimeProps {
  title?: string;
  handleChangeValue?: (value: number) => void; // month
  value: number;
  name?: string;
}
export const SelectTime = (props: SelectTimeProps) => {
  const { title, handleChangeValue, value, name } = props;
  const configForm = useFormInstance();

  const options = [
    {
      id: 1,
      value: 6,
      title: "6 months"
    },
    {
      id: 2,
      value: 12,
      title: "1 year"
    },
    {
      id: 3,
      value: 24,
      title: "2 years"
    },
    {
      id: 4,
      value: 'custom',
      title: 'Customize',
      itemChildren: <Flex gap={10} align="center">
        <Form.Item
          name={`${name ?? ''}_customTime`}
          rules={[
            { required: true, message: 'Please enter a number' },
            { max: 5, message: 'Maximum 5 digits' }
          ]}
        >
          <AppInput
            maxLength={5}
            className="input-time"
            placeholder="Enter a month"
            onChange={(e) => {
              handleChangeValue?.(e.target.value as any);
            }}
            onKeyPress={(event) => {
              if (!/^[0-9]+$/.test(event.key)) {
                event.preventDefault();
              }
              if (event.key === "0" && configForm.getFieldValue(`${name ?? ''}_customTime`) == "") {
                event.preventDefault();
              }
            }}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData('Text');
              if (!/^[0-9]+$/.test(pastedText) || pastedText.startsWith('0')) {
                e.preventDefault();
              }
            }}
          />
        </Form.Item>
        <Text className="black">months</Text>
      </Flex>
    }
  ]

  return (
    <Flex vertical gap={12}>
      <Text className="neutral-1">{title}</Text>
      <Form.Item
        name={name}
        rules={[
          {
            required: true,
            message: 'Please select an option'
          }
        ]}
      >
        <RadioGroup
          items={options}
          onChange={(value) => {
            handleChangeValue?.(value as number)
          }}
        />
      </Form.Item>
    </Flex>
  )
}