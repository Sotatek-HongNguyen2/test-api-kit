import "../styles.scss";
import { Flex, Form } from "antd";
import { useEffect, useState } from "react";
import { ColumnsType } from "antd/es/table";

import { EditFormProps } from "@/components/templates/form";
import { AppButton, IconButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import WillToast from "@/components/atoms/ToastMessage";
import { contractAddress, getWillContract } from "@/pages/ConfigWillPage";
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import { WillType } from "@/types";
import { getWalletSlice, useAppSelector } from "@/store";
import { CardDisclosureProps, CartItemContainer } from "@/components/organisms/details-card/CardItemContainer";
import { NoteIcon, TrashIcon } from "@/assets/icons/custom-icon";
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { AppTable } from "@/components/molecules/table";
import { SelectAsset } from "@/components/molecules/asset-item/SelectAsset";
import {
  TokenModal,
  TokenModalType,
} from "@/components/molecules/asset-item/TokenModal";
import useDisclosure from "@/hooks/useDisclosure";

import { AssetDataColumn, AssetSelectType } from "../AddAssetDistributionForm";
import clsx from "clsx";
import { useDevices } from "@/hooks/useMediaQuery";
import formatNumber from "@/helpers/useFormatToken";
import { DefaultOptionType } from "antd/es/select";

export const EditAssetDistribution = (props: EditFormProps & CardDisclosureProps) => {
  const configForm = Form.useFormInstance();
  const { getFieldValue, getFieldError, setFieldValue } = configForm;
  const assetDistribution = Form.useWatch("assetDistribution", {
    form: configForm,
  });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentType, setCurrentType] = useState<TokenModalType | null>(null);
  const [currentToken, setCurrentToken] = useState<any>(null);

  const { scWillId, type, willAddress, hasIcon, isDisclosure, isEdit } = props;
  const [loading, setLoading] = useState(false);
  const { address } = useAppSelector(getWalletSlice);

  const [assets, setAssets] = useState<AssetDataColumn[]>(
    assetDistribution || []
  );
  const [asset, setAsset] = useState<AssetSelectType | null>(null);
  const { isTablet } = useDevices();

  const handleDeleteAsset = (record: DefaultOptionType) => {
    const newAssets = assets.filter((item) => item.value !== record.value);
    setAssets(newAssets);
    setFieldValue("assetDistribution", newAssets);
  };

  const columns: ColumnsType<AssetDataColumn> = [
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (_, record) => <AssetName asset={record as any} />,
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text className="neutral-1 font-semibold">
          {amount}
        </Text>
      ),
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap={16} justify="flex-end">
          {record?.symbol === "ETH" ? (
            <>
              <AppButton
                type="primary-outlined"
                size="xl"
                onClick={() => {
                  onOpen();
                  setCurrentType("deposit");
                  setCurrentToken({
                    ...record,
                    value: record?.symbol,
                    assetAddress:
                      (record as any)?.address || (record as any)?.assetAddress,
                  });
                }}
              >
                <Text className="uppercase font-bold">Deposit</Text>
              </AppButton>
              <AppButton
                type="primary"
                size="xl"
                onClick={() => {
                  onOpen();
                  setCurrentType("withdraw");
                  setCurrentToken({
                    ...record,
                    value: record?.symbol,
                    assetAddress:
                      (record as any)?.address || (record as any)?.assetAddress,
                  });
                }}
              >
                <Text className="uppercase font-bold">Withdraw</Text>
              </AppButton>
            </>
          ) : (
            <AppButton
              type="primary"
              size="xl"
              onClick={() => {
                onOpen();
                setCurrentType("approve");
                setCurrentToken({
                  ...record,
                  value: record?.symbol,
                  assetAddress:
                    (record as any)?.address || (record as any)?.assetAddress,
                });
              }}
            >
              <Text className="uppercase font-bold">Approve</Text>
            </AppButton>
          )}
        </Flex>
      ),
    },
    {
      title: "",
      render: (_, record) => (
        <IconButton onClick={() => handleDeleteAsset(record)}>
          <TrashIcon />
        </IconButton>
      ),
    },
  ];

  const handleSuccess = (amount: any) => {
    for (let i = 0; i < assetDistribution.length; i++) {
      if (assetDistribution[i].assetAddress === currentToken.assetAddress) {
        assetDistribution[i].amount = formatNumber(amount);
      }
    }
    setAssets(
      assetDistribution?.map((item: any) => ({
        ...item,
        value: item?.symbol,
      }))
    );
  };

  useEffect(() => {
    setAssets(
      assetDistribution?.map((item: any) => ({
        ...item,
        value: item?.symbol,
      }))
    );
  }, [assetDistribution]);

  const handleAddAsset = () => {
    const assetIndex = assets.findIndex((item) => item.value === asset?.value);
    const newAsset: AssetDataColumn = {
      symbol: asset?.value,
      amount: asset?.amount as number,
      value: asset?.value as string,
      assetAddress: asset?.assetAddress as string,
    };
    const newAssets = [...assets];
    if (assetIndex > -1) {
      newAssets[assetIndex] = newAsset;
    } else {
      newAssets.push(newAsset);
    }
    setAssets(newAssets);
    setFieldValue("assetDistribution", newAssets);
  };

  const handleUpdateAsset = async () => {
    try {
      setLoading(true);
      if (!scWillId) {
        WillToast.error("Will not found, please try again later!");
        return;
      }
      const txError = getFieldError("assetDistribution");
      if (txError?.length > 0) {
        WillToast.error(txError[0]);
        return;
      }
      const assetDistribution = getFieldValue("assetDistribution");
      const Contract = getWillContract(type as WillType);
      if (!Contract) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      const addressData = contractAddress(type as WillType);
      const contract = new Contract({
        address: addressData,
        provider: {
          type: PROVIDER_TYPE.WALLET,
          injectObject: WALLET_INJECT_OBJ.METAMASK,
        },
      });
      const res = await contract?.setWillAssets({
        willId: Number(scWillId),
        assets: (assetDistribution ?? []).map((item: any) => item.assetAddress),
      });

      const estGas = await res?.estimateGas({
        from: address,
      });

      const res2 = await res.send({
        from: address,
        gas: estGas.toString(),
      });
      if (res2) {
        WillToast.success("Update activation trigger successfully!");
      }
    } catch (error: any) {
      WillToast.error(error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CartItemContainer
      title="Configure asset distribution"
      iconTitle={<NoteIcon />}
      hasIcon={hasIcon}
      isDisclosure={isDisclosure}
    >
      <Flex vertical gap={24}>
        <Form.Item
          name="assetDistribution"
          rules={[
            {
              required: true,
              message: "Please select at least an asset and save",
            },
          ]}
        >
          <Flex vertical gap={16}>
            <Text className="neutral-1">You’re a designated assets:</Text>
            <AppTable
              columns={columns}
              dataSource={assets}
              pagination={false}
              className={`asset-distribution-table ${assets && assets.length > 0 && "have-data"}`}
              hasIconAction
            />
            <Flex gap={16} align="flex-end" className="update-asset">
              <SelectAsset
                asset={asset}
                addAsset={(asset) => setAsset(asset)}
                disableSelected={{
                  selectedAssets: assets,
                }}
              />
              {asset?.value &&
                !assets.find((item) => item.value === asset?.value) ? (
                <Flex style={{ width: "40%" }} gap={16}>
                  <AppButton
                    type="primary-outlined"
                    size="xl"
                    onClick={handleAddAsset}
                  >
                    <Text className="uppercase primary font-bold">Select</Text>
                  </AppButton>
                </Flex>
              ) : null}
            </Flex>
          </Flex>
        </Form.Item>
        {
          isEdit && type === "inheritance" && (
            <AppButton
              type="primary"
              size="xl"
              className={clsx("", !isTablet && "none-styles")}
              onClick={handleUpdateAsset}
              loading={loading}
            >
              <Text className="uppercase" size="text-lg">
                Save
              </Text>
            </AppButton>
          )
        }
      </Flex>
      {isOpen && currentType && currentToken && willAddress && (
        <TokenModal
          open={isOpen}
          onClose={onClose}
          type={currentType}
          token={currentToken}
          willAddress={willAddress}
          willType={type}
          successSend={handleSuccess}
          scWillId={scWillId}
        />
      )}
    </CartItemContainer>
  );
};
