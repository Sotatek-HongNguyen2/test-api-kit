import "./styles.scss"
import { Select, SelectProps } from "antd"

export const AppSelect = (props: SelectProps) => {
  const {
    placeholder = "Select",
    ...restProps
  } = props;

  return (
    <Select placeholder={placeholder} {...restProps} />
  )
}