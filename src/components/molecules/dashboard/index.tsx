import { Flex } from "antd";
import "./styles.scss";
import { Text } from "@/components/atoms/text";

interface DashboardProps {
  title: string;
}

export const Dashboard = ({ title }: DashboardProps) => {
  return (
    <Flex align="center" justify="center" className="dashboard-page">
      <Text size="text-4xl" className="font-semibold white">{title}</Text>
    </Flex>
  );
};