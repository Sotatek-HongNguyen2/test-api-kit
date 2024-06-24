import { Text } from "@/components/atoms/text";
import { Flex, Form, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "./AssetName";
import { BaseAsset } from "@/types";
import { AppButton } from "@/components/atoms/button";
import { assetDataList } from "@/constants/asset";
import { useMemo } from "react";

export const AssetTableWithAction = () => {

  const configForm = Form.useFormInstance();
  const { getFieldValue } = configForm;
  const selectOptions = useMemo(() => {
    const assetDistribution = getFieldValue('assetDistribution') ?? [];
    return assetDistribution?.map((item: any) => {
      const asset = assetDataList.find((asset) => asset.symbol === item?.value);
      return {
        ...asset,
        ...item,
      }
    });
  }, [getFieldValue])

  const columns: ColumnsType<BaseAsset> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: (_, record) => <AssetName asset={record} />
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text className="neutral-1 font-semibold">{amount}</Text>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (_, record) => (
        <Flex gap={8} justify="flex-end" className="configured-table-action">
          {
            record?.symbol === "ETH" ? (
              <>
                <AppButton size="small" type="primary-outlined" className="btn-action">
                  <Text size="text-sm" className="font-bold uppercase">Deposit</Text>
                </AppButton>
                <AppButton size="small" type="primary" className="btn-action">
                  <Text size="text-sm" className="font-bold uppercase">Withdraw</Text>
                </AppButton>
              </>
            ) : (
              <AppButton size="small" type="primary" className="btn-action">
                <Text size="text-sm" className="font-bold uppercase">Approve</Text>
              </AppButton>
            )
          }
        </Flex>
      )
    }
  ];
  return (
    <>
      <Table
        columns={columns}
        dataSource={selectOptions}
        pagination={false}
        className="configured-table"
      />
    </>
  )
};