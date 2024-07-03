import { Flex } from "antd";

import { AppProgress } from "@/components/atoms/progress";
import { Text } from "@/components/atoms/text";
import { usePercentCompletion } from "@/hooks/usePercentCompletion";

export interface WillProgressProps {
  minimumSignatures: number;
  activeDate: string;
  createdDate: string;
  title?: string;
}

export const WillProgress = (props: WillProgressProps) => {
  const { minimumSignatures, activeDate, createdDate, title } = props;

  return (
    <Flex vertical gap="8px">
      <Text className="neutral-1">
        {title
          ? title
          : `This will requires a minimum of ${minimumSignatures} signature${minimumSignatures > 1 ? "s" : ""
          } for wallet access.`}
      </Text>
      <AppProgress percent={usePercentCompletion(createdDate, activeDate) as any} />
      <Text size="text-sm" className="neutral-2">
        {usePercentCompletion(createdDate, activeDate)}% time till activation
      </Text>
    </Flex>
  );
};
