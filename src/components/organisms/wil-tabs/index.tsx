import { Tabs, TabsProps } from "antd";

import "./styles.scss";

import { WillList } from "./will-list";

export const WillTabs = () => {
  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "My wills",
      children: <WillList type="created" />,
    },
    {
      key: "2",
      label: "My inherited wills",
      children: <WillList type="inherited" />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  );
};
