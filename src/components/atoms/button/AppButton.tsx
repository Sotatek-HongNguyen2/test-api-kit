import "./styles.scss";
import { Button, ButtonProps } from "antd";
import { ButtonType } from "antd/es/button";
import { SizeType } from "antd/es/config-provider/SizeContext";
import clsx from "clsx";

export interface AppButtonProps extends Omit<ButtonProps, "type" | "size"> {
  type?: ButtonType | "primary-outlined" | "normal";
  rightIcon?: React.ReactNode;
  icon?: React.ReactNode;
  size?: SizeType | "xl";
}

export const AppButton = (props: AppButtonProps) => {
  const { type, rightIcon, className, size, icon, ...restProps } = props;
  return (
    <Button
      type={type as ButtonType}
      {...restProps}
      size={size as SizeType}
      {...(rightIcon && {
        icon: rightIcon,
        iconPosition: "end",
      })}
      icon={icon && icon}
      className={clsx(
        "app-button",
        className,
        type && `app-button--${type}`,
        size && `app-button--${size}`
      )}
    />
  );
};
