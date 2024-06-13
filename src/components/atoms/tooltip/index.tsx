import { TooltipIcon } from "@/assets/icons/custom-icon";
import { Tooltip, TooltipProps } from "antd";

export const AppTooltip = ({ children, ...restProps }: TooltipProps) => {
  return (
    <Tooltip {...restProps}>
      {children ?? <TooltipIcon />}
    </Tooltip>
  )
}