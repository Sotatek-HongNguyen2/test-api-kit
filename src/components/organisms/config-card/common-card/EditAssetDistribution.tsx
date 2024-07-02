import "../styles.scss";
import { NoteIcon } from "@/assets/icons/custom-icon"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Flex, Form } from "antd"
import { AssetDataColumn, AssetSelectType } from "../AddAssetDistributionForm"
import { EditFormProps } from "@/components/templates/form"
import { AppButton } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useEffect, useState } from "react"
import WillToast from "@/components/atoms/ToastMessage"
import { contractAddress, getWillContract } from "@/pages/ConfigWillPage"
import { PROVIDER_TYPE } from "@/models/contract/evm/contract"
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract"
import { WillType } from "@/types"
import { getWalletSlice, useAppSelector } from "@/store"
import { ColumnsType } from "antd/es/table"
import formatNumber from "@/helpers/useFormatToken"
import { AssetName } from "@/components/molecules/asset-item/AssetName"
import { AppTable } from "@/components/molecules/table"
import { SelectAsset } from "@/components/molecules/asset-item/SelectAsset"
import { TokenModal, TokenModalType } from "@/components/molecules/asset-item/TokenModal";
import useDisclosure from "@/hooks/useDisclosure";

export const EditAssetDistribution = (props: EditFormProps) => {

  const configForm = Form.useFormInstance();
  const { getFieldValue, getFieldError, setFieldValue } = configForm;
  const assetDistribution = Form.useWatch('assetDistribution', { form: configForm });
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [currentType, setCurrentType] = useState<TokenModalType | null>(null);
  const [currentToken, setCurrentToken] = useState<any>(null);

  const { scWillId, type, willAddress } = props;
  const [loading, setLoading] = useState(false);
  const { address } = useAppSelector(getWalletSlice);


  const [assets, setAssets] = useState<AssetDataColumn[]>(assetDistribution || []);
  const [asset, setAsset] = useState<AssetSelectType | null>(null);

  const columns: ColumnsType<AssetDataColumn> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: (_, record) => <AssetName asset={record as any} />
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      render: (amount) => <Text className="neutral-1 font-semibold">{formatNumber(amount)}</Text>
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Flex gap={16} justify="flex-end">
          {
            record?.symbol === "ETH" ? (
              <>
                <AppButton type="primary-outlined" size="xl">
                  <Text className="uppercase font-bold">
                    Deposit
                  </Text>
                </AppButton>
                <AppButton type="primary" size="xl">
                  <Text className="uppercase font-bold">
                    Withdraw
                  </Text>
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
                    assetAddress: (record as any)?.address || (record as any)?.assetAddress
                  });
                }}
              >
                <Text className="uppercase font-bold">
                  Approve
                </Text>
              </AppButton>
            )
          }
        </Flex>
      )
    },
  ];

  useEffect(() => {
    setAssets(assetDistribution?.map((item: any) => ({
      ...item,
      value: item?.symbol
    })));
  }, [assetDistribution]);

  const handleAddAsset = () => {
    const assetIndex = assets.findIndex(item => item.value === asset?.value);
    const newAsset: AssetDataColumn = {
      symbol: asset?.value,
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
  }

  const handleUpdateAsset = async () => {
    try {
      setLoading(true);
      if (!scWillId) {
        WillToast.error("Will not found, please try again later!");
        return;
      }
      const txError = getFieldError('assetDistribution');
      if (txError?.length > 0) {
        WillToast.error(txError[0])
        return;
      }
      const assetDistribution = getFieldValue('assetDistribution');
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
        assets: (assetDistribution ?? []).map((item: any) => item.assetAddress)
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
      setLoading(false)
    }
  }

  return (
    <CartItemContainer
      title="Configure asset distribution"
      iconTitle={<NoteIcon />}
    >
      <Flex vertical gap={24}>
        <Form.Item
          name="assetDistribution"
          rules={[{ required: true, message: 'Please select at least an asset and save' }]}
        >
          <Flex vertical gap={16}>
            <Text className="neutral-1">You’re a designated assets:</Text>
            <AppTable
              columns={columns}
              dataSource={assets}
              pagination={false}
              className="asset-distribution-table"
            />
            <Flex gap={16} align="flex-end" className="update-asset">
              <SelectAsset
                asset={asset}
                addAsset={(asset) => setAsset(asset)}
                disableSelected={{
                  selectedAssets: assets
                }}
              />
              {
                (asset?.value && !assets.find(item => item.value === asset?.value)) ? (
                  <Flex style={{ width: "40%" }} gap={16}>
                    <AppButton type="primary-outlined" size="xl" onClick={handleAddAsset}>
                      <Text className="uppercase primary font-bold">
                        Select
                      </Text>
                    </AppButton>
                  </Flex>
                ) : null
              }
            </Flex>
          </Flex >
        </Form.Item>
        <AppButton
          type="primary"
          size="xl"
          className="none-styles"
          onClick={handleUpdateAsset}
          loading={loading}
        >
          <Text className="uppercase" size="text-lg">Save</Text>
        </AppButton>
      </Flex>
      {
        isOpen && currentType && currentToken && willAddress && (
          <TokenModal
            open={isOpen}
            onClose={onClose}
            type={currentType}
            token={currentToken}
            willAddress={willAddress}
            willType={type}
          />
        )
      }
    </CartItemContainer>
  )
}