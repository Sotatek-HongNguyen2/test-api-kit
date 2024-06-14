import clsx from "clsx";
import "./styles.scss"

type sizeType = "none" | "small" | "medium" | "large";

interface CardProps {
  boxShadow?: sizeType;
  radius?: sizeType;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const Card = (props: CardProps) => {
  const { boxShadow = "small", radius = "small", className, children, onClick } = props;
  return (
    <div className={clsx(`app-card box-shadow-${boxShadow} radius-${radius}`, className)} onClick={onClick}>
      {children}
    </div>
  )
};