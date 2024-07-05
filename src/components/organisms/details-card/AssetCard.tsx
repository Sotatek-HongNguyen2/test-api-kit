import { ColumnsType } from "antd/es/table";
import { useMemo } from "react";

import { DiamondIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { Text } from "@/components/atoms/text";
import { AssetData, WillData } from "@/types";
import formatNumber from "@/helpers/useFormatToken";

import { CartItemContainer } from "./CardItemContainer";
import { Tooltip } from "antd";

interface AssetCardProps {
  willDetail: WillData;
}

export const AssetCard = ({ willDetail }: AssetCardProps) => {
  const getTooltip = (data: any) => {
    return (
      <Tooltip title={data} placement="top">
        {formatNumber(Number(data))}
      </Tooltip>
    );
  };

  const getAmount = (asset: AssetData, ownerBalance: any) => {
    if (ownerBalance && ownerBalance?.symbol === "ETH") {
      return Number(willDetail.willBalance ?? 0) > Number(ownerBalance?.balance)
        ? getTooltip(ownerBalance?.balance)
        : getTooltip(willDetail.willBalance);
    }
    return Number(asset?.amount ?? 0) > Number(ownerBalance?.balance)
      ? getTooltip(ownerBalance?.balance)
      : getTooltip(asset?.amount);
  };

  const listAsset = useMemo(
    () =>
      willDetail?.willAsset?.map((asset) => {
        const ownerBalance = willDetail?.ownerBalance?.find(
          (item) => item.address == asset.asset
        );

        return {
          ...asset,
          ...ownerBalance,
          amount: getAmount(asset, ownerBalance),
        };
      }),
    [willDetail]
  );

  const columns: ColumnsType<AssetData> = [
    {
      title: "Token",
      dataIndex: "name",
      key: "name",
      render: (_, asset) => <AssetName asset={asset} />,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text size="text-md" className="neutral-1 font-semibold">
          {amount ?? "0.0"}
        </Text>
      ),
    },
  ];

  return (
    <CartItemContainer
      title={`Assets (${listAsset?.length ?? 0})`}
      iconTitle={<DiamondIcon />}
    >
      <AppTable dataSource={listAsset} columns={columns} pagination={false} />
    </CartItemContainer>
  );
};
