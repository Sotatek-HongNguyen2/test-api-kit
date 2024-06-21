import { AssetData, WillData } from "@/types"
import { CartItemContainer } from "./CardItemContainer"
import { DiamondIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { Text } from "@/components/atoms/text";
import { assetTemp } from "../wil-tabs";

interface AssetCardProps {
  willDetail: WillData;
}

export const AssetCard = ({ willDetail }: AssetCardProps) => {

  const columns: ColumnsType<AssetData> = [
    {
      title: 'Token',
      dataIndex: 'name',
      key: 'name',
      render: (_, asset) => <AssetName asset={asset} ownerBalance={willDetail?.ownerBalance} />
    },
    {
      title: 'Total amount',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance) => <Text size="text-md" className="neutral-1 font-semibold">{balance ?? '0.0'}</Text>
    },
  ];

  return (
    <CartItemContainer
      title={`Assets (${willDetail?.willAsset?.length ?? 0})`}
      iconTitle={<DiamondIcon />}
    >
      <AppTable dataSource={willDetail?.willAsset} columns={columns} pagination={false} />
    </CartItemContainer>
  )
}