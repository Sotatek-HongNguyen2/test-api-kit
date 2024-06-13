import { AssetData } from "@/types"
import { CartItemContainer } from "./CardItemContainer"
import { DiamondIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { Text } from "@/components/atoms/text";

interface AssetCardProps {
  assets: AssetData[];
}

export const AssetCard = ({ assets }: AssetCardProps) => {

  const columns: ColumnsType<AssetData> = [
    {
      title: 'Token',
      dataIndex: 'name',
      key: 'name',
      render: (_, asset) => <AssetName asset={asset} />
    },
    {
      title: 'Total amount',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance) => <Text size="text-md" className="neutral-1 font-semibold">{balance}</Text>
    },
  ];

  return (
    <CartItemContainer
      title={`Assets (${assets?.length ?? 0})`}
      iconTitle={<DiamondIcon />}
    >
      <AppTable dataSource={assets} columns={columns} pagination={false} />
    </CartItemContainer>
  )
}