import "./styles.scss";
import { Flex } from "antd";
import { useEffect, useState } from "react";

import { Text } from "@/components/atoms/text";
import { AppInput } from "@/components/atoms/input";
import { AppButton } from "@/components/atoms/button";
import { AssetSelectType } from "@/components/organisms/config-card/AddAssetDistributionForm";

import { SelectAsset } from "./SelectAsset";
import { useDevices } from "@/hooks/useMediaQuery";

interface ConfigAssetProps {
  handleAddConfigAsset: (asset: AssetSelectType, percent: number) => number;
  selectedAssets?: any[];
  currentBeneficiary?: any;
  totalOptions?: any[];
  isEdit?: boolean;
}

export const ConfigAsset = (props: ConfigAssetProps) => {
  const { handleAddConfigAsset, selectedAssets, currentBeneficiary, totalOptions, isEdit } = props;
  const [asset, setAsset] = useState<AssetSelectType | null>(null);
  const [percent, setPercent] = useState<number | string>('');
  const { isTablet } = useDevices();

  useEffect(() => {
    setAsset(null);
  }, [currentBeneficiary]);

  const handleChangePercent = (value: string) => {
    if (Number(value) > 100) {
      setPercent(100);
      return;
    }
    setPercent(value);
  };
  const handleMaxPercent = () => {
    setPercent(100);
  };

  const handleSave = async () => {
    setPercent(0);
    if (asset) {
      const result = await handleAddConfigAsset(asset, Number(percent));
      result && setAsset(null);
    }
  };

  return (
    <Flex vertical gap={10}>
      <Flex
        vertical={isTablet ? true : false}
        gap={16}
        align={isTablet ? "normal" : "flex-end"}
        justify="space-between"
        className="config-asset"
      >
        <SelectAsset
          asset={asset}
          addAsset={(asset: AssetSelectType) => {
            setAsset(asset);
            const isSelectedAsset = selectedAssets?.find(
              (item) => item?.value === asset?.value
            );
            if (isSelectedAsset) {
              setPercent(isSelectedAsset?.amount);
            } else {
              setPercent(1);
            }
          }}
          totalOptions={totalOptions}
        />
        <Flex vertical gap={10} className="input-percentage">
          <Text className="font-semibold neutral-1">
            Inheritance Percentage
          </Text>
          <AppInput
            value={percent ?? ''}
            type="number"
            placeholder="0"
            min={0}
            style={{ minHeight: "30px !important" }}
            suffix={
              <div style={{ cursor: "pointer" }} onClick={handleMaxPercent}>
                <Text className="uppercase primary font-semibold">MAX</Text>
              </div>
            }
            onChange={(e) => handleChangePercent(e.target.value)}
            onKeyPress={(event) => {
              if (event.key === "0" && percent === "") {
                event.preventDefault();
              }
              if (!/[0-9]/.test(event.key)) {
                event.preventDefault();
              }
            }}
            onPaste={(e) => {
              const pastedText = e.clipboardData.getData('Text');
              if (!/^[0-9]+$/.test(pastedText) || pastedText.startsWith('0')) {
                e.preventDefault();
              }
            }}
          />
        </Flex>
        {
          isEdit ? (
            <AppButton
              type="primary-outlined"
              size="xl"
              onClick={handleSave}
              disabled={!asset || !percent}
            >
              <Text className="uppercase primary font-bold" size="text-lg">
                Configure
              </Text>
            </AppButton>
          ) : null
        }
      </Flex>
      {
        !isEdit && (
          <AppButton
            type="primary"
            className="none-styles uppercase"
            onClick={handleSave}
            disabled={!asset || !percent}
          >
            Save
          </AppButton>
        )
      }
    </Flex>
  );
};
