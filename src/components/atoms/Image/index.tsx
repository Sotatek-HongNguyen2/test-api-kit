import { APP_COLORS } from "@/constants";
import "./styles.scss";
import { Image } from "antd";

interface TextProps {
  children?: React.ReactNode;
  className?: string;
  width?: number;
  src?: string;
}

export const WillImage = ({ children, className, src, width }: TextProps) => {
  return children ? (
    children
  ) : (
    <Image className={`${className}`} width={width} preview={false} src={src} />
  );
};

export default WillImage;
