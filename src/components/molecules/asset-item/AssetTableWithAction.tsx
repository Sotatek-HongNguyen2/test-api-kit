import { Text } from "@/components/atoms/text";
import { Flex, Form, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "./AssetName";
import { BaseAsset } from "@/types";
import { AppButton } from "@/components/atoms/button";
import { useMemo, useState } from "react";
import formatNumber from "@/helpers/useFormatToken";
import { TokenModal, TokenModalType } from "./TokenModal";
import useDisclosure from "@/hooks/useDisclosure";
import { assetData } from "@/constants/asset";

export const AssetTableWithAction = ({ willAddress }: { willAddress: string }) => {
  const configForm = Form.useFormInstance();
  const { getFieldValue } = configForm;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentType, setCurrentType] = useState<TokenModalType | null>(null);
  const [currentToken, setCurrentToken] = useState<any>(null);
  const selectOptions = useMemo(() => getFieldValue('assetDistribution') ?? [], [getFieldValue]);
  console.log("selectOptions: ", selectOptions);

  const columns: ColumnsType<any> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: (_, record) => <AssetName asset={{
        ...assetData[record?.value],
        symbol: record?.value
      }} />
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text className="neutral-1 font-semibold">{formatNumber(amount)}</Text>
    },
    {
      title: 'Action',
      dataIndex: '',
      key: '',
      render: (_, record) => (
        <Flex gap={8} justify="flex-end" className="configured-table-action">
          {
            record?.symbol !== "ETH" ? (
              <>
                <AppButton
                  size="small"
                  type="primary-outlined"
                  className="btn-action"
                  onClick={() => {
                    onOpen();
                    setCurrentType("deposit");
                    setCurrentToken(record);
                  }}
                >
                  <Text size="text-sm" className="font-bold uppercase">Deposit</Text>
                </AppButton>
                <AppButton
                  size="small"
                  type="primary"
                  className="btn-action"
                  onClick={() => {
                    onOpen();
                    setCurrentType("withdraw");
                    setCurrentToken(record);
                  }}
                >
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
      {
        isOpen && currentType && currentToken && (
          <TokenModal
            open={isOpen}
            onClose={onClose}
            type={currentType}
            token={currentToken}
            willAddress={willAddress}
          />
        )
      }
    </>
  )
};