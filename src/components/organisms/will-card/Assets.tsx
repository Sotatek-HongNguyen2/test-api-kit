import { Col, Flex, Row, Tooltip } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetItem } from "@/components/molecules";
import { AssetData, WillData } from "@/types";
import { useMemo } from "react";
import formatNumber from "@/helpers/useFormatToken";
import { getBalanceSlide, useAppSelector } from "@/store";

interface AssetsProps {
  assets: AssetData[];
  will: WillData;
}

export const Assets = ({ will }: AssetsProps) => {
  const { listBalances } = useAppSelector(getBalanceSlide);

  const getTooltip = (data: any) => {
    return (
      <Tooltip title={data} placement="top">
        {formatNumber(Number(data))}
      </Tooltip>
    );
  };
  const getAmount = (asset: AssetData, ownerBalance: any) => {
    if (ownerBalance && ownerBalance?.symbol === "ETH") {
      return Number(will.willBalance ?? 0) > Number(ownerBalance?.balance)
        ? getTooltip(ownerBalance?.balance)
        : getTooltip(will.willBalance);
    }
    return Number(asset?.amount ?? 0) > Number(ownerBalance?.balance)
      ? getTooltip(ownerBalance?.balance)
      : getTooltip(asset?.amount);
  };

  const listAsset = useMemo(
    () =>
      will?.willAsset?.map((asset) => {
        const ownerBalance = listBalances?.find(
          (item) => item.assetAddress == asset.asset
        );

        return {
          ...asset,
          ...ownerBalance,
          amount: getAmount(asset, ownerBalance),
        };
      }),
    [will]
  );
  return (
    <Row>
      <Col span={24}>
        <Text className="font-semibold neutral-1">
          Assets ({will.willAsset.length ?? 0})
        </Text>
      </Col>
      <Col span={24} className="mt-3">
        <Flex vertical gap="16px">
          {listAsset.map((asset, index) => (
            <AssetItem asset={asset} key={`${index}-${asset.willId}`} />
          ))}
        </Flex>
      </Col>
    </Row>
  );
};
