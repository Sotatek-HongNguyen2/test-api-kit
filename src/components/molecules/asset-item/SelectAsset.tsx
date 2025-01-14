import "./styles.scss";
import { Flex } from "antd";
import { useState } from "react";
import { DefaultOptionType } from "antd/es/select";

import { Text } from "@/components/atoms/text";
import { AppSelect } from "@/components/atoms/select";
import { AssetSelectType } from "@/components/organisms/config-card/AddAssetDistributionForm";
import { assetDataList } from "@/constants/asset";
import { getBalanceSlide, useAppSelector } from "@/store";

import { AssetName } from "./AssetName";

interface SelectAssetProps {
  asset: AssetSelectType | null;
  addAsset?: (asset: AssetSelectType) => void;
  disableSelected?:
  | false
  | {
    selectedAssets: AssetSelectType[];
  };
  totalOptions?: any[];
}

export const SelectAsset = ({
  asset,
  addAsset,
  disableSelected,
  totalOptions,
}: SelectAssetProps) => {
  const [currentAsset, setCurrentAsset] = useState<DefaultOptionType | null>(
    null
  );
  const { listBalances } = useAppSelector(getBalanceSlide);

  const assetOptions = (totalOptions ?? listBalances ?? [])?.map((asset) => {
    const labelAsset = assetDataList.find(
      (item) => item?.symbol === asset?.symbol
    );
    return {
      title: asset?.name,
      value: asset?.symbol,
      amount: asset?.balance,
      assetAddress: asset?.assetAddress,
      label: <AssetName asset={labelAsset} />,
      disabled: !disableSelected
        ? false
        : disableSelected?.selectedAssets?.some(
          (item) => item?.value === asset?.symbol
        ),
    };
  });

  return (
    <Flex vertical gap={10} className="select-asset">
      <Text className="font-semibold neutral-1">Asset</Text>
      <Flex align="center" gap={12}>
        <AppSelect
          value={asset}
          options={assetOptions}
          onChange={(_, option) => {
            setCurrentAsset(option as any);
            addAsset && addAsset(option as any);
          }}
          labelRender={() => {
            return (
              <AssetName
                asset={assetDataList?.find(
                  (item) => item?.symbol === currentAsset?.value
                )}
                showSign={false}
                iconClassName="asset-icon--small"
              />
            );
          }}
        />
      </Flex>
    </Flex>
  );
};
