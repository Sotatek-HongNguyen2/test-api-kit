import { Col, Flex, Row } from "antd";

import { Text } from "@/components/atoms/text";
import { AssetItem } from "@/components/molecules";
import { AssetData, WillData } from "@/types";
import { useMemo } from "react";
import formatNumber from "@/helpers/useFormatToken";

interface AssetsProps {
  assets: AssetData[];
  will: WillData;
}

export const Assets = ({ will }: AssetsProps) => {
  const listAsset = useMemo(
    () =>
      will?.willAsset?.map((asset) => {
        const ownerBalance = will?.ownerBalance?.find(
          (item) => item.address == asset.asset
        );
        return {
          ...asset,
          ...ownerBalance,
          amount:
            Number(asset?.amount ?? 0) > Number(ownerBalance?.balance)
              ? formatNumber(Number(ownerBalance?.balance))
              : formatNumber(Number(asset?.amount)),
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
