import { AppButton } from "@/components/atoms/button";
import { WillList } from "./will-list";
import "./styles.scss"
import { Tabs, TabsProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Text } from "@/components/atoms/text";

export const assetTemp = [
  {
    name: 'Bitcoin',
    sign: 'BTC',
    balance: 60502.89,
    assetIcon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
  },
  {
    name: 'Ethereum',
    sign: 'ETH',
    balance: 1250329.72,
    assetIcon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
  },
  {
    name: 'DMarket',
    sign: 'DMT',
    balance: 274612.41,
    assetIcon: 'https://cryptologos.cc/logos/dmarket-dmt-logo.png?v=002'
  }
]

export const WillTabs = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My wills',
      children: <WillList type="created" />,
    },
    {
      key: '2',
      label: 'My inherited wills',
      children: <WillList type="inherited" />,
    },
  ];

  const addWill = <AppButton type="primary" size="xl" icon={<PlusOutlined />}>
    <Text size="text-lg" className="uppercase font-bold" >Create a Will</Text>
  </AppButton>

  return (
    <Tabs defaultActiveKey="1" items={items} tabBarExtraContent={addWill} />
  )
}