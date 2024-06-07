import "./styles.scss"
import { Tabs, TabsProps } from "antd"

export const WillTabs = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My will',
      children: 'Content of Tab Pane 1',
    },
    {
      key: '2',
      label: 'My inherited wills',
      children: 'Content of Tab Pane 2',
    },
  ];

  return (
    <Tabs defaultActiveKey="1" items={items} />
  )
}