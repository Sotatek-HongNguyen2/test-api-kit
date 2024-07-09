import { Flex, Form, Tooltip } from "antd";
import { ColumnsType } from "antd/es/table";
import { useEffect, useMemo, useState } from "react";

import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import formatNumber from "@/helpers/useFormatToken";
import useDisclosure from "@/hooks/useDisclosure";
import { AssetType, assetData } from "@/constants/asset";

import { AssetName } from "./AssetName";
import { TokenModal, TokenModalType } from "./TokenModal";
import { AppTable } from "../table";
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer";
import { DiamondIcon } from "@/assets/icons/custom-icon";

export const AssetTableWithAction = ({
  willAddress,
  isEdit,
}: {
  willAddress: string;
  isEdit?: boolean;
}) => {
  const configForm = Form.useFormInstance();
  const { getFieldValue, setFieldValue } = configForm;
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentType, setCurrentType] = useState<TokenModalType | null>(null);
  const [currentToken, setCurrentToken] = useState<any>(null);
  const selectOptions = useMemo(() => {
    const arr = getFieldValue("assetDistribution");
    if (arr) {
      for (let i = 0; i < arr.length; i++) {
        arr[i].amount = 0;
      }
      return arr;
    }
    return [];
  }, [getFieldValue]);

  const handleSuccess = (amount: any) => {
    for (let i = 0; i < selectOptions.length; i++) {
      if (selectOptions[i].assetAddress === currentToken.assetAddress) {
        selectOptions[i].amount = amount;
      }
    }
  };

  useEffect(() => {
    setFieldValue("assetDistribution", selectOptions);
  }, [selectOptions]);

  const columns: ColumnsType<any> = [
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (_, record) => (
        <AssetName
          asset={{
            ...assetData[record?.value as AssetType],
            symbol: record?.value,
          }}
        />
      ),
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text className="neutral-1 font-semibold">
          {
            <Tooltip title={amount} placement="top">
              {formatNumber(amount)}
            </Tooltip>
          }
        </Text>
      ),
    },
    {
      title: "Action",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <Flex gap={8} justify="flex-end" className="configured-table-action">
          {record?.symbol === "ETH" ? (
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
                <Text size="text-sm" className="font-bold uppercase primary">
                  Deposit
                </Text>
              </AppButton>
              {isEdit ? (
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
                  <Text size="text-sm" className="font-bold uppercase">
                    Withdraw
                  </Text>
                </AppButton>
              ) : null}
            </>
          ) : (
            <AppButton
              size="small"
              type="primary"
              className="btn-action"
              onClick={() => {
                onOpen();
                setCurrentType("approve");
                setCurrentToken(record);
              }}
            >
              <Text size="text-sm" className="font-bold uppercase">
                Approve
              </Text>
            </AppButton>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <CartItemContainer
      title={`Asset (${selectOptions?.length ?? 0})`}
      iconTitle={<DiamondIcon />}
    >
      <AppTable
        columns={columns}
        dataSource={selectOptions}
        pagination={false}
        className="configured-table"
      />
      {isOpen && currentType && currentToken && (
        <TokenModal
          open={isOpen}
          onClose={onClose}
          type={currentType}
          token={currentToken}
          successSend={handleSuccess}
          willAddress={willAddress}
        />
      )}
    </CartItemContainer>
  );
};
