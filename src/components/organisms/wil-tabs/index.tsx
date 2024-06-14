import { AppButton } from "@/components/atoms/button";
import { WillList } from "./will-list";
import "./styles.scss"
import { Tabs, TabsProps } from "antd"
import { PlusOutlined } from "@ant-design/icons"
import { Text } from "@/components/atoms/text";
import { BeneficiaryData, WillData } from "@/types";

const assetTemp = [
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

const beneficiaryTemp: BeneficiaryData[] = [
  {
    id: 1,
    name: "Son",
    walletAddress: "0x1234567890Ha2",
    percentage: [
      {
        name: 'Bitcoin',
        sign: 'BTC',
        percentage: 30,
        assetIcon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
      },
      {
        name: 'Ethereum',
        sign: 'ETH',
        percentage: 30,
        assetIcon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
      },
    ]
  },
  {
    id: 2,
    name: "Daughter",
    walletAddress: "0x1234567890Ha3",
    percentage: [
      {
        name: 'Bitcoin',
        sign: 'BTC',
        percentage: 30,
        assetIcon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
      },
      {
        name: 'Ethereum',
        sign: 'ETH',
        percentage: 30,
        assetIcon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
      },
      {
        name: 'DMarket',
        sign: 'DMT',
        percentage: 50,
        assetIcon: 'https://cryptologos.cc/logos/dmarket-dmt-logo.png?v=002'
      }
    ]
  },
  {
    id: 3,
    name: "Wife",
    walletAddress: "0x1234567890Ha4",
    percentage: [
      {
        name: 'Bitcoin',
        sign: 'BTC',
        percentage: 40,
        assetIcon: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png'
      },
      {
        name: 'Ethereum',
        sign: 'ETH',
        percentage: 40,
        assetIcon: 'https://cryptologos.cc/logos/ethereum-eth-logo.png'
      },
      {
        name: 'DMarket',
        sign: 'DMT',
        percentage: 50,
        assetIcon: 'https://cryptologos.cc/logos/dmarket-dmt-logo.png?v=002'
      }
    ]
  }
]

export const willsData: WillData[] = [
  {
    willId: 1,
    willName: 'Family will',
    willType: 'inheritance',
    assets: assetTemp,
    beneficiaries: beneficiaryTemp,
    activeDate: '2024-07-24T00:00:00Z',
    createdDate: '2021-06-24T00:00:00Z',
    minimumSignatures: 2,
    totalSignatures: 2,
    noteToBeneficiaries: "Kids, be nice.Don’t play Succession over this.Love - Mom.",
    method: 'created',
    active: false
  },
  {
    willId: 2,
    willName: 'Business will',
    willType: 'inheritance',
    assets: assetTemp,
    beneficiaries: beneficiaryTemp,
    activeDate: '2024-07-24T00:00:00Z',
    createdDate: '2021-06-24T00:00:00Z',
    minimumSignatures: 2,
    totalSignatures: 3,
    noteToBeneficiaries: "Kids, be nice.Don’t play Succession over this.Love - Mom.",
    method: 'inherited',
    active: true
  },
  {
    willId: 3,
    willName: 'Personal will',
    willType: 'forwarding',
    assets: assetTemp,
    beneficiaries: beneficiaryTemp,
    activeDate: '2024-07-24T00:00:00Z',
    createdDate: '2021-06-24T00:00:00Z',
    minimumSignatures: 2,
    totalSignatures: 3,
    noteToBeneficiaries: "Kids, be nice.Don’t play Succession over this.Love - Mom.",
    method: 'created',
    active: false
  },
  {
    willId: 4,
    willName: 'Dad will',
    willType: 'forwarding',
    assets: assetTemp,
    beneficiaries: beneficiaryTemp,
    activeDate: '2024-07-24T00:00:00Z',
    createdDate: '2021-06-24T00:00:00Z',
    minimumSignatures: 2,
    totalSignatures: 3,
    noteToBeneficiaries: "Kids, be nice.Don’t play Succession over this.Love - Mom.",
    method: 'inherited',
    active: false
  }
]

export const WillTabs = () => {

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: 'My wills',
      children: <WillList wills={willsData?.filter(will => will?.method === "created")} type="created" />,
    },
    {
      key: '2',
      label: 'My inherited wills',
      children: <WillList wills={willsData?.filter(will => will?.method === "inherited")} type="inherited" />,
    },
  ];

  const addWill = <AppButton type="primary" size="xl" icon={<PlusOutlined />}>
    <Text size="text-lg" className="uppercase font-bold" >Create a Will</Text>
  </AppButton>

  return (
    <Tabs defaultActiveKey="1" items={items} tabBarExtraContent={addWill} />
  )
}