import { Button } from "antd";
import "./styles.scss"

interface IconButtonProps {
  children: React.ReactNode;
}

export const IconButton = (props: IconButtonProps) => {
  return (
    <Button className="app-icon-button none-styles" icon={props.children} />
  )
}