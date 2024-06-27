import "./styles.scss";
import { Text } from "@/components/atoms/text";
import { Flex, Form } from "antd";
import { RadioGroup } from "../radio-group";
import { AppInput } from "@/components/atoms/input";

interface SelectTimeProps {
  title?: string;
  handleChangeValue?: (value: number) => void; // month
  value: number;
  name?: string;
}
export const SelectTime = (props: SelectTimeProps) => {
  const { title, handleChangeValue, value, name } = props;

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
      <RadioGroup
        items={options}
        value={value}
        onChange={(value) => {
          handleChangeValue?.(value as number)
        }}
      />
    </Flex>
  )
}