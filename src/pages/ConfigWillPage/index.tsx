import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { AssetTableWithAction } from "@/components/molecules/asset-item/AssetTableWithAction";
import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import { Flex, Form } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PROVIDER_TYPE } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import inheritanceWillContract from "@/models/contract/evm/InheritanceWill";
import { getWalletSlice, useAppSelector } from "@/store";
import WillToast from "@/components/atoms/ToastMessage";
import { BeneficiaryData } from "@/types";

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
  console.log("address: ", address);

  const navigate = useNavigate();
  const [form] = Form.useForm<ConfigFormDataType>();
  const [isConfigured, setIsConfigured] = useState(false);

  const onFinish = async (values: ConfigFormDataType) => {
    console.log("values: ", values);
    if (!address) {
      WillToast.error("Please connect your wallet first");
      return;
    }
    const contract = new inheritanceWillContract({
      address: address,
      provider: {
        type: PROVIDER_TYPE.WALLET,
        injectObject: WALLET_INJECT_OBJ.METAMASK,
      },
    });
    const params = {
      nameWill: values?.willName,
      note: values?.note,
      nickNames: values?.beneficiariesList.map((item) => item.name),
      beneficiaries: values?.beneficiariesList.map((item) => address),
      minRequiredSignatures: values?.minRequiredSignatures,
      lackOfOutgoingTxRange: values?.lackOfOutgoingTxRange || 0,
      lackOfSignedMsgRange: values?.lackOfSignedMsgRange || 0,
    }
    const res = await contract?.createWill(params);
    const res2 = await res.send({
      from: address,
    })
    console.log('res2', res2)

    // setIsConfigured(true);
  };
  return (
    <WrapperContainer title="Configure your will">
      <Form
        form={form}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Flex vertical gap={16}>
          {
            isConfigured ? (
              <>
                <AssetTableWithAction />
                <AppButton type="primary" className="none-styles">
                  <Text size="text-lg" className="font-bold">Save</Text>
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
            )
          }
        </Flex>
      </Form>
    </WrapperContainer>
  );
};
