import { Text } from "../text"
import "./styles.scss"
import { Checkbox, CheckboxProps } from "antd"

export const AppCheckbox = ({ children, ...restProps }: CheckboxProps) => {
  return (
    <Checkbox {...restProps}>
      {
        typeof children === 'string' ? <Text className="font-semibold main-text">{children}</Text> : children
      }
    </Checkbox>
  )
}