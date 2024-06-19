import "./styles.scss"
import { AppSelect } from "@/components/atoms/select"
import { Text } from "@/components/atoms/text"
import { assetTemp } from "@/components/organisms/wil-tabs"
import { Flex } from "antd"
import { useState } from "react"
import { DefaultOptionType } from "antd/es/select"
import { AssetName } from "./AssetName"
import { AssetSelectType } from "@/components/organisms/config-card/AddAssetDistributionForm"

interface SelectAssetProps {
  addAsset?: (asset: AssetSelectType) => void;
}

export const SelectAsset = ({ addAsset }: SelectAssetProps) => {
  const [currentAsset, setCurrentAsset] = useState<DefaultOptionType | null>(null);

  const assetOptions = assetTemp?.map((asset) => ({
    title: asset?.name,
    value: asset?.sign,
    label: <AssetName asset={asset} />
  }))

  return (
    <Flex vertical gap={12} className="select-asset">
      <Text className="font-semibold neutral-1">Asset</Text>
      <Flex align="center" gap={12}>
        <AppSelect
          className="select-asset"
          options={assetOptions}
          onChange={(_, option) => {
            setCurrentAsset(option as any);
            addAsset && addAsset(option as any);
          }}
          labelRender={() => {
            return <AssetName
              asset={assetTemp?.find(item => item?.sign === currentAsset?.value)}
              showSign={false}
              iconClassName="asset-icon--small"
            />
          }}
        />
      </Flex>
    </Flex>
  )
}