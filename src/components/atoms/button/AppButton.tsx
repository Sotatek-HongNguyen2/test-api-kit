import "./styles.scss"
import { Button, ButtonProps } from "antd"
import { ButtonType } from "antd/es/button";
import clsx from "clsx";

interface AppButtonProps extends Omit<ButtonProps, 'type'> {
  type?: ButtonType | "connect-btn"
  rightIcon?: React.ReactNode
}

export const AppButton = (props: AppButtonProps) => {
  const { type, rightIcon, className, ...restProps } = props;
  return (
    <Button
      type={type as ButtonType}
      {...restProps}
      {
      ...(rightIcon && {
        icon: rightIcon,
        iconPosition: "end"
      })
      }
      className={clsx("app-button", className, type && `app-button--${type}`)}
    />
  )
}