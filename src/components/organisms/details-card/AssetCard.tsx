import { AssetData, WillData } from "@/types"
import { CartItemContainer } from "./CardItemContainer"
import { DiamondIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { Text } from "@/components/atoms/text";
import { useMemo } from "react";
import formatNumber from "@/helpers/useFormatToken";

interface AssetCardProps {
  willDetail: WillData;
}

export const AssetCard = ({ willDetail }: AssetCardProps) => {

  const listAsset = useMemo(() => willDetail?.willAsset?.map((asset) => {
    const ownerBalance = willDetail?.ownerBalance?.find(
      (item) => item.address == asset.asset
    );
    const amount = Number(asset?.amount) > Number(ownerBalance?.balance)
      ? formatNumber(Number(ownerBalance?.balance))
      : formatNumber(Number(asset?.amount));
    return {
      ...asset,
      ...ownerBalance,
      amount,
    }
  }), [willDetail]);

  const columns: ColumnsType<AssetData> = [
    {
      title: 'Token',
      dataIndex: 'name',
      key: 'name',
      render: (_, asset) => <AssetName asset={asset} />
    },
    {
      title: 'Total amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text size="text-md" className="neutral-1 font-semibold">{amount ?? '0.0'}</Text>
    },
  ];

  return (
    <CartItemContainer
      title={`Assets (${listAsset?.length ?? 0})`}
      iconTitle={<DiamondIcon />}
    >
      <AppTable dataSource={listAsset} columns={columns} pagination={false} />
    </CartItemContainer>
  )
}