import { Flex } from "antd";

import { WillTabs } from "@/components/organisms/wil-tabs";

export function HomePage() {
  return (
    <Flex vertical gap="5vh" className="home-page">
      <WillTabs />
    </Flex>
  );
}
