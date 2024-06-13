import { Card } from "@/components/atoms/card";
import { WillProgress, WillProgressProps } from "../will-card/WillProgress";

export const ProgressCard = (props: WillProgressProps) => {
  return (
    <Card boxShadow="large">
      <WillProgress {...props} />
    </Card>
  )
};