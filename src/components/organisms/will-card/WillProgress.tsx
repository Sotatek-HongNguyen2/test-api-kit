import { AppProgress } from "@/components/atoms/progress";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";

export interface WillProgressProps {
  minimumSignatures: number;
  activeDate: string;
  createdDate: string;
  title?: string;
}

export const WillProgress = (props: WillProgressProps) => {
  const { minimumSignatures, activeDate, createdDate, title } = props;

  const getDays = (fromDate: string, toDate: string) => Math.floor((new Date(toDate).getTime() - new Date(fromDate).getTime()) / (1000 * 60 * 60 * 24));

  const totalDays = getDays(createdDate, activeDate);
  const remainDays = getDays(new Date().toISOString(), activeDate);
  const progress = Math.round((totalDays - remainDays) / totalDays * 100);

  return (
    <Flex vertical gap="8px">
      <Text className="neutral-1">
        {
          title ? title : `This will requires a minimum of ${minimumSignatures} signature${minimumSignatures > 0 ? 's' : ''} for wallet access.`
        }
      </Text>
      <AppProgress percent={progress} />
      <Text size="text-sm" className="neutral-2">{progress}% time till activation</Text>
    </Flex>
  )
};