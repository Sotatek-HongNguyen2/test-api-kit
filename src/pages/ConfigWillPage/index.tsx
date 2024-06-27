import { Flex, Form } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { AssetTableWithAction } from "@/components/molecules/asset-item/AssetTableWithAction";
import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import inheritanceWillContract from "@/models/contract/evm/InheritanceWill";
import { getWalletSlice, useAppSelector } from "@/store";
import WillToast from "@/components/atoms/ToastMessage";
import { BeneficiaryData, WillType } from "@/types";
import { AssetDataColumn } from "@/components/organisms/config-card/AddAssetDistributionForm";
import { ethers } from "ethers";
import forwardingWillContract from "@/models/contract/evm/ForwardingWill";
import destructionWillContract from "@/models/contract/evm/DestructionWill";
import { APP_ROUTES_PATHS } from "@/constants";
import { BeneficiaryConfig } from "@/components/organisms/config-card/AssetToBeneficiary";
import { uniqBy } from "lodash";

export interface ConfigFormDataType {
  willName: string;
  note: string;
  beneficiariesList: BeneficiaryData[];
  initBeneficiaries: BeneficiaryData[];
  lackOfOutgoingTxRange: number;
  lackOfSignedMsgRange: number;
  minRequiredSignatures: number;
  assetDistribution: AssetDataColumn[];
  activationTrigger: string[];
  lackOfOutgoingTxRange_customTime: number;
  lackOfSignedMsgRange_customTime: number;
  beneficiaries: "existing" | "generate";
}

export const contractAddress = (willType: WillType) => {
  switch (willType) {
    case "inheritance":
      return import.meta.env.VITE_INHERITANCE_ROUTER;
    case "forwarding":
      return import.meta.env.VITE_FORWARDING_ROUTER;
    default: // destruction
      return import.meta.env.VITE_DESTRUCTION_ROUTER;
  }
};

export const getWillContract = (willType: WillType) => {
  switch (willType) {
    case "inheritance":
      return inheritanceWillContract;
    case "forwarding":
      return forwardingWillContract;
    case "destruction":
      return destructionWillContract;
    default:
      return null;
  }
}
export function ConfigWillPage() {
  const { address } = useAppSelector(getWalletSlice);
  const { willType } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm<ConfigFormDataType>();
  const { setFieldValue } = form;
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [willAddress, setWillAddress] = useState<string | null>(null);

  const getParams = (values: ConfigFormDataType) => {
    switch (willType) {
      case "inheritance":
        return {
          nameWill: values?.willName,
          note: values?.note,
          nickNames: (values?.beneficiariesList ?? []).map((item) => item.name),
          beneficiaries: (values?.beneficiariesList ?? []).map((item) => item?.address),
          assets: (values?.assetDistribution ?? []).map((item) => item.assetAddress),
          minRequiredSignatures: values?.minRequiredSignatures,
          lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
          lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
        }
      case "forwarding":
        return {
          nameWill: values?.willName,
          note: values?.note,
          nickNames: (values?.beneficiariesList ?? [])?.map((item) => item.name),
          distributions: ((values?.beneficiariesList ?? []) as BeneficiaryConfig[])?.map((item) => {
            return [
              item?.address,
              item?.assetConfig.map((item) => item.asset?.assetAddress),
              item.assetConfig.map((item) => item?.percent)
            ]
          }),
          minRequiredSignatures: values?.minRequiredSignatures,
          lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
          lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
        }
      case "destruction":
        return {
          nameWill: values?.willName,
          assetAddresses: (values?.assetDistribution ?? []).map((item) => item.assetAddress),
          lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
          lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
        }
      default:
        return null;
    }
  }

  const onFinish = async (values: ConfigFormDataType) => {
    try {
      setLoading(true);
      if (!address) {
        WillToast.error("Please connect your wallet first");
        return;
      }
      const addressData = contractAddress(willType as WillType);
      if (!addressData || !willType) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      const Contract = getWillContract(willType as WillType);
      if (!Contract) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      const contract = new Contract({
        address: addressData,
        provider: {
          type: PROVIDER_TYPE.WALLET,
          injectObject: WALLET_INJECT_OBJ.METAMASK,
        },
      });
      const params = getParams(values);
      if (willType === "forwarding") {
        const listAsset = ((values?.beneficiariesList ?? []) as BeneficiaryConfig[])
          .flatMap((item) => (item?.assetConfig ?? [])?.map(asset => ({
            ...asset?.asset,
            symbol: asset?.asset?.value
          })));
        const distinctArray = uniqBy(listAsset, 'value');
        setFieldValue("assetDistribution", distinctArray);
      }

      if (!params) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      const res = await contract?.createWill(params as any);

      const estGas = await res?.estimateGas({
        from: address,
        value: "0",
      });

      const res2 = await res.send({
        from: address,
        value: "0",
        gas: estGas.toString(),
      });

      const providerUrl = import.meta.env.VITE_ETH_RPC_URL;
      const provider = new ethers.providers.JsonRpcProvider(providerUrl);
      const txwait = await provider.waitForTransaction(res2?.transactionHash);
      const decodedLog = ethers.utils.defaultAbiCoder.decode(
        ["uint256", "address", "address", "tuple", "tuple", "uint256"],
        txwait.logs[0].data
      );
      const willAddress = decodedLog[1];
      if (willAddress) {
        setWillAddress(willAddress);
        setIsConfigured(true);
      }

    } catch (error: any) {
      WillToast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WrapperContainer
      title="Configure your will"
      hasBackButton={!isConfigured}
      description={isConfigured ? "You must approve/deposit tokens to finish creating will." : undefined}
    >
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Flex vertical gap={16}>
          {isConfigured && willAddress ? (
            <>
              <AssetTableWithAction willAddress={willAddress} />
              <AppButton
                type="primary"
                className="none-styles"
                onClick={() => {
                  WillToast.success("Configure assets details successfully");
                  navigate(APP_ROUTES_PATHS.HOME);
                }}
              >
                <Text size="text-lg" className="font-bold">
                  Save
                </Text>
              </AppButton>
            </>
          ) : (
            <>
              <WillTypeCard />
              <WillForm />
              <Flex align="center" gap={16}>
                <AppButton
                  size="xl"
                  type="primary"
                  className="uppercase font-bold"
                  htmlType="submit"
                  loading={loading}
                >
                  Configure will
                </AppButton>
                <AppButton
                  size="xl"
                  className="uppercase font-bold neutral-1 transparent"
                  onClick={() => navigate(-1)}
                >
                  Cancel
                </AppButton>
              </Flex>
            </>
          )}
        </Flex>
      </Form>
    </WrapperContainer>
  );
}
