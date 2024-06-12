import { MyInheritedWill } from "./list-inherited-will";
import { MyWill } from "./list-my-will";
import "./styles.scss"
import { Tabs, TabsProps } from "antd"

export const WillTabs = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My wills',
      children: <MyWill />,
    },
    {
      key: '2',
      label: 'My inherited wills',
      children: <MyInheritedWill />,
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}