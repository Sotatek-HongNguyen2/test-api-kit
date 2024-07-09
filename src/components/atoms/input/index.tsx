import "./styles.scss"
import Input, { InputProps } from "antd/es/input/Input"

interface AppInputProps extends InputProps {
  onlyNumber?: boolean;
  preventPasteSpecialChar?: boolean;
}

export const AppInput = (props: AppInputProps) => {
  const { onlyNumber, preventPasteSpecialChar = false, ...restProps } = props;
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
      {
      ...(preventPasteSpecialChar && {
        onPaste: (e) => {
          const pastedText = e.clipboardData.getData('Text');
          if (!/^[a-zA-Z0-9]+$/.test(pastedText)) {
            e.preventDefault();
          }
        }
      })
      }
      {...restProps}
    />
  )
}