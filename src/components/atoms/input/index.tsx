import "./styles.scss"
import Input, { InputProps } from "antd/es/input/Input"

interface AppInputProps extends InputProps {
  onlyNumber?: boolean;
}

export const AppInput = (props: AppInputProps) => {
  const { onlyNumber, ...restProps } = props;
  return (
    <Input
      {
      ...(onlyNumber && {
        type: "number",
        onKeyPress: (event) => {
          if (!/[0-9]/.test(event.key)) {
            event.preventDefault();
          }
        }
      })
      }
      {...restProps}
    />
  )
}