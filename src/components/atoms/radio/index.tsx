import { Text } from "../text";
import "./styles.scss"
import { Radio, RadioProps } from "antd";

export interface CustomRadioProps extends Omit<RadioProps, 'value' | 'title'> {
  title: string;
  value: string | number;
}

export const AppRadio = (props: CustomRadioProps) => {
  const { title, ...rest } = props;
  return (
    <Radio {...rest}>
      <Text size="text-md">{props.title}</Text>
    </Radio>
  )
}