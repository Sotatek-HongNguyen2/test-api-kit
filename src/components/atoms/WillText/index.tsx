import { APP_COLORS } from "@/constants";
import "./styles.scss";

interface TextProps {
  children?: React.ReactNode;
  className?: string;
}

export const WillText = ({ children, className }: TextProps) => {
  return <span className={`${className}`}>{children}</span>;
};

export default WillText;
