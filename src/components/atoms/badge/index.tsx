import clsx from "clsx";
import "./styles.scss"
import { Badge, BadgeProps } from "antd";

interface AppBadgeProps extends Omit<BadgeProps, 'size' | 'color'> {
  size?: BadgeProps['size'] | 'lg';
  color?: BadgeProps['color']; // change primary
}

export const AppBadge = (props: AppBadgeProps) => {
  const { color, size, className, ...restProps } = props;
  return (
    <Badge
      color={color}
      size={size as BadgeProps['size']}
      className={clsx(className, color && `app-badge-${color}`, size && `app-badge-${size}`)}
      {...restProps}
    />
  )
}