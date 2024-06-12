import "./styles.scss"
import { AppButton, AppButtonProps } from "./AppButton";
import clsx from "clsx";

interface IconButtonProps extends AppButtonProps {
  children: React.ReactNode;
}

export const IconButton = (props: IconButtonProps) => {
  const { children, type, ...restProps } = props;
  return (
    <AppButton className={clsx("app-icon-button none-styles", `icon-button--${type}`)} icon={children} {...restProps} />
  )
}