import { Flex, Form } from "antd";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Web3 from "web3";

import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { AssetTableWithAction } from "@/components/molecules/asset-item/AssetTableWithAction";
import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import { PROVIDER_TYPE, ProviderType } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import inheritanceWillContract from "@/models/contract/evm/InheritanceWill";
import { getWalletSlice, useAppSelector } from "@/store";
import WillToast from "@/components/atoms/ToastMessage";
import { BeneficiaryData } from "@/types";
import { getWeb3Instance } from "@/helpers/evmHandlers";
import BigNumber from "bignumber.js";

export interface ConfigFormDataType {
  willName: string;
  note: string;
  beneficiariesList: BeneficiaryData[];
  lackOfOutgoingTxRange: number;
  lackOfSignedMsgRange: number;
  minRequiredSignatures: number;
}

export function ConfigWillPage() {
  const { address } = useAppSelector(getWalletSlice);
  const { willType } = useParams();

  const navigate = useNavigate();
  const [form] = Form.useForm<ConfigFormDataType>();
  const [isConfigured, setIsConfigured] = useState(false);
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: ConfigFormDataType) => {
    const provider: ProviderType = {
      type: PROVIDER_TYPE.WALLET,
      injectObject: WALLET_INJECT_OBJ.METAMASK,
    };
    const web3 = getWeb3Instance(provider);
    try {
      setLoading(true);
      if (!willType) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }
      if (!address) {
        WillToast.error("Please connect your wallet first");
        return;
      }
      const contractAddress = () => {
        switch (willType) {
          case "inheritance":
            return import.meta.env.VITE_INHERITANCE_ROUTER;
          case "forwarding":
            return import.meta.env.VITE_FORWARDING_ROUTER;
          default:
            return import.meta.env.VITE_DESTRUCTION_ROUTER;
        }
      };
      const addressData = contractAddress();
      if (!addressData) {
        WillToast.error("Something went wrong, please try again later");
        return;
      }

      const contract = new inheritanceWillContract({
        address: addressData,
        provider: {
          type: PROVIDER_TYPE.WALLET,
          injectObject: WALLET_INJECT_OBJ.METAMASK,
        },
      });

      const params = {
        nameWill: values?.willName,
        note: values?.note,
        nickNames: values?.beneficiariesList.map((item) => item.name),
        beneficiaries: values?.beneficiariesList.map((item) => item?.address),
        minRequiredSignatures: values?.minRequiredSignatures,
        lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
        lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
      };

      const res = await contract?.createWill(params);

      const estGas = (await res?.estimateGas({
        from: "0xb286BaAeaAe23590d16539652D49F58cA6282b9C",
        value: "0",
      })) as any;

      const gasPrice = (await web3.eth.getGasPrice()) as any;
      const estGasNumber = new BigNumber(estGas);
      const gasPriceNumber = new BigNumber(gasPrice);
      const gas = estGasNumber.multipliedBy(gasPriceNumber).toString();

      const res2 = await res.send({
        from: address,
        gas: gas,
        value: "0",
      });
      console.log("res2", res2);

      setIsConfigured(true);
    } catch (error: any) {
      WillToast.error(error.message);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <WrapperContainer title="Configure your will">
      <Form form={form} onFinish={onFinish} autoComplete="off">
        <Flex vertical gap={16}>
          {isConfigured ? (
            <>
              <AssetTableWithAction />
              <AppButton type="primary" className="none-styles">
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
