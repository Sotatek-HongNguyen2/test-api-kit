import { TrashIcon } from "@/assets/icons/custom-icon";
import "./styles.scss"
import { AppButton, IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text"
import { SelectAsset } from "@/components/molecules/asset-item/SelectAsset";
import { AppTable } from "@/components/molecules/table"
import formatNumber from "@/helpers/useFormatToken";
import { Flex, Form } from "antd"
import { DefaultOptionType } from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export interface AssetDataColumn {
  token: React.ReactNode;
  amount: number;
  value: string;
  assetAddress: string;
}

export type AssetSelectType = DefaultOptionType & {
  amount: number;
}

export const AddAssetDistributionForm = () => {

  const configForm = Form.useFormInstance();
  const { setFieldValue } = configForm;

  const [assets, setAssets] = useState<AssetDataColumn[]>([]);
  const [asset, setAsset] = useState<AssetSelectType | null>(null);

  const handleDeleteAsset = (record: DefaultOptionType) => {
    const newAssets = assets.filter(item => item.value !== record.value);
    setAssets(newAssets);
    setFieldValue("assetDistribution", newAssets);
  }

  const columns: ColumnsType<DefaultOptionType> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'Total balance',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text className="neutral-1 font-semibold">{formatNumber(amount)}</Text>
    },
    {
      title: "",
      render: (_, record) => (
        <IconButton onClick={() => handleDeleteAsset(record)}>
          <TrashIcon />
        </IconButton>
      )
    }
  ];

  const handleAddAsset = () => {
    const assetIndex = assets.findIndex(item => item.value === asset?.value);
    const newAsset: AssetDataColumn = {
      token: asset?.label,
      amount: asset?.amount as number,
      value: asset?.value as string,
      assetAddress: asset?.assetAddress as string,
    }
    const newAssets = [...assets];
    if (assetIndex > -1) {
      newAssets[assetIndex] = newAsset;
    } else {
      newAssets.push(newAsset);
    }
    setAssets(newAssets);
    setFieldValue("assetDistribution", newAssets);
    setAsset(null);
  }

  return (
    <Flex vertical gap={16}>
      <Text className="neutral-1">You’re a designated assets:</Text>
      <AppTable
        columns={columns}
        dataSource={assets}
        pagination={false}
        className={`asset-distribution-table ${assets && assets.length > 0 && "have-data"}`}
        hasIconAction
      />
      <SelectAsset
        asset={asset}
        disableSelected={{
          selectedAssets: assets
        }}
        addAsset={(asset) => setAsset(asset)}
      />
      <AppButton
        className="none-styles uppercase"
        size="xl"
        type="primary"
        onClick={handleAddAsset}
        disabled={!asset}
      >
        Save
      </AppButton>
    </Flex >
  )
}