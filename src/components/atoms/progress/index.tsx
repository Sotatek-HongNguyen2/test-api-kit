import "./styles.scss"
import { Progress, ProgressProps } from "antd"

export const AppProgress = (props: ProgressProps) => {
  return (
    <Progress showInfo={false} {...props} />
  )
}