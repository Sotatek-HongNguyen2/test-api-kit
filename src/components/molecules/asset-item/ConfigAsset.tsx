import "./styles.scss";
import { Flex } from "antd";
import { useEffect, useState } from "react";

import { Text } from "@/components/atoms/text";
import { AppInput } from "@/components/atoms/input";
import { AppButton } from "@/components/atoms/button";
import { AssetSelectType } from "@/components/organisms/config-card/AddAssetDistributionForm";

import { SelectAsset } from "./SelectAsset";

interface ConfigAssetProps {
  handleAddConfigAsset: (asset: AssetSelectType, percent: number) => number;
  selectedAssets?: any[];
  currentBeneficiary?: any;
}

export const ConfigAsset = (props: ConfigAssetProps) => {
  const { handleAddConfigAsset, selectedAssets, currentBeneficiary } = props;
  const [asset, setAsset] = useState<AssetSelectType | null>(null);
  const [percent, setPercent] = useState<number>(1);

  useEffect(() => {
    setAsset(null);
    setPercent(1);
  }, [currentBeneficiary]);

  const handleChangePercent = (value: string) => {
    if (Number(value) > 100) {
      setPercent(100);
      return;
    }
    setPercent(Number(value));
  };
  const handleMaxPercent = () => {
    setPercent(100);
  };

  const handleSave = async () => {
    setPercent(1);
    if (asset) {
      const result = await handleAddConfigAsset(asset, Number(percent));
      result && setAsset(null);
    }
  };

  return (
    <Flex vertical gap={10}>
      <Flex
        gap={16}
        align="center"
        justify="space-between"
        className="config-asset"
      >
        <SelectAsset
          asset={asset}
          addAsset={(asset: AssetSelectType) => {
            setAsset(asset);
            const isSelectedAsset = selectedAssets?.find(item => item?.value === asset?.value);
            if (isSelectedAsset) {
              setPercent(isSelectedAsset?.amount);
            } else {
              setPercent(1);
            }
          }}
        />
        <Flex vertical gap={10} className="input-percentage">
          <Text className="font-semibold neutral-1">
            Inheritance Percentage
          </Text>
          <AppInput
            value={percent}
            type="number"
            min={1}
            style={{ minHeight: "30px !important" }}
            suffix={
              <div style={{ cursor: "pointer" }} onClick={handleMaxPercent}>
                <Text className="uppercase primary font-semibold">MAX</Text>
              </div>
            }
            onChange={(e) => handleChangePercent(e.target.value)}
          />
        </Flex>
      </Flex>
      {asset && !!percent && (
        <AppButton
          type="primary"
          className="none-styles uppercase"
          onClick={handleSave}
        >
          Save
        </AppButton>
      )}
    </Flex>
  );
};
