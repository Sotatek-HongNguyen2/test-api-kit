import { Flex } from "antd";
import "./styles.scss";
import Title from "antd/es/typography/Title";

interface DashboardProps {
  title: string;
}

export const Dashboard = ({ title }: DashboardProps) => {
  return (
    <Flex align="center" justify="center" className="dashboard-page">
      <Title level={1}>{title}</Title>
    </Flex>
  );
};