import "./styles.scss"
import { Flex } from "antd"
import { SelectAsset } from "./SelectAsset"
import { Text } from "@/components/atoms/text"
import { AppInput } from "@/components/atoms/input"
import { AppButton } from "@/components/atoms/button"
import { useState } from "react"
import { AssetSelectType } from "@/components/organisms/config-card/AddAssetDistributionForm"

interface ConfigAssetProps {
  handleAddConfigAsset: (asset: AssetSelectType, percent: number) => void;
}

export const ConfigAsset = ({ handleAddConfigAsset }: ConfigAssetProps) => {

  const [asset, setAsset] = useState<AssetSelectType | null>(null);
  const [percent, setPercent] = useState<number>(0);

  return (
    <Flex vertical gap={10}>
      <Flex gap={16} align="center" justify="space-between" className="config-asset">
        <SelectAsset addAsset={setAsset} />
        <Flex vertical gap={10} className="input-percentage">
          <Text className="font-semibold neutral-1">Inheritance Percentage</Text>
          <AppInput
            type="number"
            min={0}
            suffix={<Text className="uppercase primary font-semibold">MAX</Text>}
            onChange={(e) => setPercent(e.target.value as any)} />
        </Flex>
      </Flex>
      {
        asset && !!percent && (
          <AppButton
            type="primary"
            className="none-styles uppercase"
            onClick={() => handleAddConfigAsset(asset, Number(percent))}
          >
            Save
          </AppButton>
        )
      }
    </Flex>
  )
}