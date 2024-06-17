import TextArea, { TextAreaProps } from "antd/es/input/TextArea"
import "./styles.scss"
import clsx from "clsx"

export const AppInputArea = ({ placeholder = "Type a message...", className, ...restProps }: TextAreaProps) => {
  return (
    <TextArea placeholder={placeholder} className={clsx("app-text-area", className)} {...restProps} />
  )
}