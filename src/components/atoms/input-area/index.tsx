import TextArea, { TextAreaProps } from "antd/es/input/TextArea"
import "./styles.scss"
import clsx from "clsx"

interface AppInputAreaProps extends TextAreaProps {
  preventPasteSpecialChar?: boolean;
}

export const AppInputArea = (props: AppInputAreaProps) => {
  const { placeholder = "Type a message...", className, preventPasteSpecialChar, ...restProps } = props;
  return (
    <TextArea
      placeholder={placeholder}
      className={clsx("app-text-area", className)}

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