import "./styles.scss"
import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text"
import { SelectAsset } from "@/components/molecules/asset-item/SelectAsset";
import { AppTable } from "@/components/molecules/table"
import { Flex, Form } from "antd"
import { DefaultOptionType } from "antd/es/select";
import { ColumnsType } from "antd/es/table";
import { useState } from "react";

export interface AssetDataColumn {
  token: React.ReactNode;
  amount: number;
  value: string;
}

export type AssetSelectType = DefaultOptionType & {
  amount: number;
}

export const AddAssetDistributionForm = () => {

  const configForm = Form.useFormInstance();
  const { setFieldValue } = configForm;

  const [assets, setAssets] = useState<AssetDataColumn[]>([]);
  const [asset, setAsset] = useState<AssetSelectType | null>(null);

  const columns: ColumnsType<DefaultOptionType> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text className="neutral-1 font-semibold">{amount.toLocaleString('en-US', { minimumFractionDigits: 2 })}</Text>
    },
  ];

  const handleAddAsset = () => {
    const assetIndex = assets.findIndex(item => item.value === asset?.value);
    const newAsset: AssetDataColumn = {
      token: asset?.label,
      amount: 1000000.51,
      value: asset?.value as string
    }
    const newAssets = [...assets];
    if (assetIndex > 0) {
      newAssets[assetIndex] = newAsset;
    } else {
      newAssets.push(newAsset);
    }
    setAssets(newAssets);
    setFieldValue("assetDistribution", newAssets);
  }

  return (
    <Flex vertical gap={16}>
      <Text className="neutral-1">You’re a designated assets:</Text>
      <Form.Item name="assetDistribution">
        <AppTable
          columns={columns}
          dataSource={assets}
          pagination={false}
          className="asset-distribution-table"
        />
      </Form.Item>
      <SelectAsset addAsset={(asset) => setAsset(asset)} />
      <AppButton
        className="none-styles uppercase"
        size="xl"
        type="primary"
        onClick={handleAddAsset}
      >
        Save
      </AppButton>
    </Flex>
  )
}