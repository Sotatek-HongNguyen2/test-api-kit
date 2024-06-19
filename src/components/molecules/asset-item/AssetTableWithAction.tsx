import { Text } from "@/components/atoms/text";
import { assetTemp } from "@/components/organisms/wil-tabs";
import { Flex, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "./AssetName";
import { AssetData } from "@/types";
import { AppButton } from "@/components/atoms/button";

export const AssetTableWithAction = () => {

  const columns: ColumnsType<AssetData> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: (_, record) => <AssetName asset={record} />
    },
    {
      title: 'Amount',
      dataIndex: 'balance',
      key: 'balance',
      render: (balance) => <Text className="neutral-1 font-semibold">{balance}</Text>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (_, record) => (
        <Flex gap={8} justify="flex-end" className="configured-table-action">
          {
            record?.sign === "ETH" ? (
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
        dataSource={assetTemp}
        pagination={false}
        className="configured-table"
      />
    </>
  )
};