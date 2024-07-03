import { Flex, Form } from "antd";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ethers } from "ethers";
import { uniqBy } from "lodash";

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
import forwardingWillContract from "@/models/contract/evm/ForwardingWill";
import destructionWillContract from "@/models/contract/evm/DestructionWill";
import { APP_ROUTES_PATHS } from "@/constants";
import { BeneficiaryConfig } from "@/components/organisms/config-card/AssetToBeneficiary";
import { formWei } from "@/helpers/common";
import BigNumber from "bignumber.js";
import { getWeb3Instance } from "@/helpers/evmHandlers";

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
};
export function ConfigWillPage() {
  const { address } = useAppSelector(getWalletSlice);
  const { willType } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm<ConfigFormDataType>();
  const { setFieldValue, getFieldsError, getFieldsValue } = form;
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(false);
  const [willAddress, setWillAddress] = useState<string | null>(null);
  const [isValidForm, setIsValidForm] = useState(false);
  const watchAssetDistribution = Form.useWatch("assetDistribution", form);
  const isValidFormConfig = useMemo(() => {
    if (willType === "forwarding") return isValidForm;
    return (
      isValidForm &&
      !!watchAssetDistribution &&
      watchAssetDistribution?.length > 0
    );
  }, [watchAssetDistribution, isValidForm, willType]);

  const watchBeneficiary = Form.useWatch("beneficiariesList", form);
  const assetPercents = useMemo(() => {
    const listAssets =
      watchBeneficiary?.flatMap((data: any) =>
        (data?.assetConfig ?? [])?.map((asset: any) => ({
          ...asset?.asset,
          percent: asset?.percent,
        }))
      ) || [];
    const distinctAsset = uniqBy(listAssets, "value");
    return distinctAsset?.map((asset: any) => ({
      ...asset,
      symbol: asset?.value,
      percent: listAssets?.reduce((acc: number, item: any) => {
        if (item?.value === asset?.value) {
          return acc + (item?.percent ?? 0);
        }
        return acc;
      }, 0),
    }));
  }, [watchBeneficiary]);

  const getParams = (values: ConfigFormDataType) => {
    const arr = [] as any;
    (values?.assetDistribution ?? []).map(
      (item: any) => item.assetAddress && arr.push(item.assetAddress)
    );
    switch (willType) {
      case "inheritance":
        return {
          nameWill: values?.willName,
          note: values?.note ?? "",
          nickNames: (values?.beneficiariesList ?? []).map((item) => item.name),
          beneficiaries: (values?.beneficiariesList ?? []).map(
            (item) => item?.address
          ),
          assets: arr,
          minRequiredSignatures: values?.minRequiredSignatures,
          lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
          lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
        };
      case "forwarding":
        return {
          nameWill: values?.willName,
          note: values?.note ?? "",
          nickNames: (values?.beneficiariesList ?? [])?.map(
            (item) => item.name
          ),
          distributions: (
            (values?.beneficiariesList ?? []) as BeneficiaryConfig[]
          )?.map((item) => {
            return [
              item?.address,
              (item?.assetConfig ?? []).map((item) => item.asset?.assetAddress),
              (item.assetConfig ?? []).map((item) => item?.percent),
            ];
          }),
          minRequiredSignatures: values?.minRequiredSignatures,
          lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
          lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
        };
      case "destruction":
        return {
          nameWill: values?.willName,
          assetAddresses: (values?.assetDistribution ?? []).map(
            (item) => item.assetAddress
          ),
          lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
          lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
        };
      default:
        return null;
    }
  };

  const checkDividedForwarding = (beneficiaries: any) => {
    return !beneficiaries.some((beneficiary: any) => {
      const assetAddress = (beneficiary?.assetConfig ?? []).map(
        (beneficiary: any) => beneficiary.asset?.assetAddress
      );
      const percent = (beneficiary?.assetConfig ?? []).map(
        (beneficiary: any) => beneficiary.percent
      );
      return assetAddress.length === 0 || percent.length === 0;
    });
  };

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
      if (willType === "forwarding") {
        const isValidConfigBeneficiaries = (
          values?.beneficiariesList ?? []
        ).some((item: any) => item?.assetConfig?.length > 0);
        if (!isValidConfigBeneficiaries) {
          WillToast.error(
            "You have to configure at least one beneficiary's asset"
          );
          return;
        }
        if (!checkDividedForwarding(values?.beneficiariesList)) {
          WillToast.error(
            "There is one beneficiaries has not be configured. Please check it and save again."
          );
          return;
        }
        const checkIsNotDonePercent = assetPercents?.some(
          (asset) => asset?.percent !== 100
        );
        if (checkIsNotDonePercent) {
          WillToast.error("Total percentage have to be 100");
          return;
        }
        const listAsset = (
          (values?.beneficiariesList ?? []) as BeneficiaryConfig[]
        ).flatMap((item) =>
          (item?.assetConfig ?? [])?.map((asset) => ({
            ...asset?.asset,
            symbol: asset?.asset?.value,
          }))
        );
        const distinctArray = uniqBy(listAsset, "value");
        setFieldValue("assetDistribution", distinctArray);
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
      if (!params) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      const res = await contract?.createWill(params as any);
      const web3 = getWeb3Instance({
        type: PROVIDER_TYPE.WALLET,
        injectObject: WALLET_INJECT_OBJ.METAMASK,
      });

      const block = await web3.eth.getBlock("latest");
      const baseFeePerGas = BigInt(block.baseFeePerGas as any);
      const maxPriorityFeePerGas = BigInt(web3.utils.toWei("1", "gwei"));
      const maxFeePerGas = baseFeePerGas + maxPriorityFeePerGas;

      const estGas = await res.estimateGas({
        from: address,
        maxFeePerGas: maxFeePerGas.toString(),
        maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
      });

      const res2 = await res.send({
        from: address,
        value: "0",
        // gas: estGas.toString(),
        // maxFeePerGas: baseFeePerGas.toString(),
        // maxPriorityFeePerGas: maxPriorityFeePerGas.toString(),
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

  const checkAllFormTouch = useCallback(
    (hasErrors: boolean) => {
      const formValues = getFieldsValue();
      let fields: (keyof ConfigFormDataType)[] = [];
      switch (willType) {
        case "inheritance":
          fields = [
            "willName",
            "beneficiaries",
            "beneficiariesList",
            "minRequiredSignatures",
            "activationTrigger",
            "lackOfOutgoingTxRange",
          ];
          break;
        case "forwarding":
          fields = [
            "willName",
            "beneficiaries",
            "beneficiariesList",
            "minRequiredSignatures",
            "activationTrigger",
            "lackOfOutgoingTxRange",
          ];
          break;
        case "destruction":
          fields = ["willName", "activationTrigger", "lackOfOutgoingTxRange"];
          break;
        default:
          break;
      }
      const check = fields.every(
        (field) =>
          formValues[field] !== undefined &&
          formValues[field] !== null &&
          formValues[field] !== ""
      );
      setIsValidForm(check && !hasErrors);
    },
    [getFieldsValue, willType]
  );

  const validateForm = () => {
    const hasErrors = getFieldsError().some(({ errors }) => errors.length > 0);
    if (hasErrors) {
      setIsValidForm(false);
      return;
    }
    checkAllFormTouch(hasErrors);
  };

  return (
    <WrapperContainer
      title="Configure your will"
      hasBackButton={!isConfigured}
      description={
        isConfigured
          ? "You must approve/deposit tokens to finish creating will."
          : undefined
      }
    >
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
        validateTrigger="onChange"
        onFieldsChange={validateForm}
      >
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
                  htmlType="submit"
                  loading={loading}
                  disabled={!isValidFormConfig}
                >
                  <Text size="text-lg" className="uppercase font-bold">
                    Configure will
                  </Text>
                </AppButton>
                <AppButton
                  size="xl"
                  className="transparent"
                  onClick={() => navigate(-1)}
                >
                  <Text size="text-lg" className="uppercase font-bold">
                    Cancel
                  </Text>
                </AppButton>
              </Flex>
            </>
          )}
        </Flex>
      </Form>
    </WrapperContainer>
  );
}
