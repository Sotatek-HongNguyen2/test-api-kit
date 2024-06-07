
import { APP_COLORS } from "@/constants";
import "./styles.scss"

interface TextProps {
  children?: React.ReactNode;
  size?: 'text-xl' | 'text-lg' | 'text-md' | 'text-sm' | 'text-xs'
  color?: string;
  className?: string;
}

export const Text = (props: TextProps) => {
  const { size = 'text-md', color = APP_COLORS.textColor, className } = props;
  return (
    <p color={color} className={`app-text ${size} ${className}`}>
      {props?.children || ""}
    </p>
  )
}