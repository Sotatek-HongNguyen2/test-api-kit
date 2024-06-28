import { BeneficiariesIcon } from "@/assets/icons/custom-icon"
import { CustomRadioItemProps, RadioGroup } from "@/components/molecules/radio-group"
import { CartItemContainer } from "@/components/organisms/details-card/CardItemContainer"
import { Flex, Form } from "antd"
import { ConfigBeneficiariesForm } from "../ConfigBeneficiariesForm"
import { EditFormProps } from "@/components/templates/form"
import { AppButton } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useState } from "react"
import WillToast from "@/components/atoms/ToastMessage"
import { contractAddress, getWillContract } from "@/pages/ConfigWillPage"
import { BeneficiaryData, WillType } from "@/types"
import { PROVIDER_TYPE } from "@/models/contract/evm/contract"
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract"
import { getWalletSlice, useAppSelector } from "@/store"

export const ConfigBeneficiaries = ({ isEdit, scWillId, type }: EditFormProps) => {

  const configForm = Form.useFormInstance();
  const { getFieldValue, setFieldValue, getFieldError } = configForm;
  const [loading, setLoading] = useState(false);
  const { address } = useAppSelector(getWalletSlice);

  const configOptions: CustomRadioItemProps[] = [
    {
      id: 1,
      value: "existing",
      title: "Use existing address",
      itemChildren: <ConfigBeneficiariesForm />,
    },
    {
      id: 2,
      value: "generate",
      title: "Generate a new address",
      itemChildren: <ConfigBeneficiariesForm generate={true} />,
    },
  ];

  const handleUpdateBeneficiaries = async () => {
    try {
      setLoading(true);
      if (!scWillId) {
        WillToast.error("Will not found, please try again later!");
        return;
      }
      const beneficiariesErr = getFieldError('beneficiariesList');
      if (beneficiariesErr?.length > 0) {
        WillToast.error(beneficiariesErr[0])
        return;
      }
      const MinSigErr = getFieldError('minRequiredSignatures');
      if (MinSigErr?.length > 0) {
        WillToast.error(MinSigErr[0])
        return;
      }
      const beneficiaries = getFieldValue('beneficiariesList');
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
      const res = await contract?.setWillBeneficiaries({
        willId: Number(scWillId),
        nickNames: ((beneficiaries ?? []) as BeneficiaryData[])?.map(elm => elm?.name),
        beneficiaries: ((beneficiaries ?? []) as BeneficiaryData[])?.map(elm => elm?.address),
        minRequiredSigs: getFieldValue('minRequiredSignatures'),
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
      WillToast.error(error?.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <CartItemContainer
      title="Configure beneficiaries"
      iconTitle={<BeneficiariesIcon />}
    >
      <Flex vertical gap={24}>
        <Form.Item
          name="beneficiaries"
          rules={[{ required: true, message: 'Please select an option' }]}
        >
          <RadioGroup
            value={getFieldValue("beneficiaries")}
            items={configOptions}
            onChange={(value) => {
              if (isEdit && value === "existing") {
                const beneficiaries = getFieldValue("initBeneficiaries") || [];
                setFieldValue("beneficiariesList", beneficiaries)
              } else {
                setFieldValue("beneficiariesList", [])
              }
            }}
          />
        </Form.Item>
        {
          isEdit ? (
            <AppButton
              type="primary"
              size="xl"
              className="none-styles"
              onClick={handleUpdateBeneficiaries}
              loading={loading}
            >
              <Text className="uppercase" size="text-lg">Save</Text>
            </AppButton>
          ) : null
        }
      </Flex>
    </CartItemContainer>
  );
};
