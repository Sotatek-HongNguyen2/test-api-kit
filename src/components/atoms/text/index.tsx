
import { APP_COLORS } from "@/constants";
import "./styles.scss"

interface TextProps {
  children?: React.ReactNode;
  size?: 'text-3xl' | 'text-2xl' | 'text-xl' | 'text-lg' | 'text-md' | 'text-sm' | 'text-xs'
  color?: string;
  className?: string;
  align?: 'left' | 'center' | 'right';
}

export const Text = (props: TextProps) => {
  const { size = 'text-md', color = APP_COLORS.textColor, className, align } = props;
  return (
    <p color={color} className={`app-text ${size} ${className} text-${align}`}>
      {props?.children || ""}
    </p>
  )
}