import "./styles.scss";
import { Text } from "@/components/atoms/text";
import { Flex, Form } from "antd";
import { RadioGroup } from "../radio-group";
import { AppInput } from "@/components/atoms/input";

interface SelectTimeProps {
  name: string;
  title?: string;
  handleChangeValue?: (value: number) => void; // month
}
export const SelectTime = ({ name, title, handleChangeValue }: SelectTimeProps) => {

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
          name="customTime"
          rules={[
            { required: true, message: 'Please enter a number' },
            { max: 5, message: 'Maximum 5 digits' }
          ]}
        >
          <AppInput
            className="input-time"
            onlyNumber
            placeholder="Enter a number"
            min={0}
            onChange={(e) => {
              handleChangeValue?.(e.target.value as any);
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