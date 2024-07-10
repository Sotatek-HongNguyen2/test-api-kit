import { AttentionIcon, TriggerIcon } from "@/assets/icons/custom-icon"
import { CartItemContainer } from "../../details-card/CardItemContainer"
import { Flex, Form } from "antd"
import { Text } from "@/components/atoms/text"
import { CheckboxGroup, CustomCheckboxItemProps } from "@/components/molecules/checkbox-group"
import { SelectTime } from "@/components/molecules/select-time"
import { useState } from "react"
import { EditFormProps } from "@/components/templates/form"
import { AppButton } from "@/components/atoms/button"
import WillToast from "@/components/atoms/ToastMessage"
import { contractAddress, getWillContract } from "@/pages/ConfigWillPage"
import { WillType } from "@/types"
import { PROVIDER_TYPE } from "@/models/contract/evm/contract"
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract"
import { getWalletSlice, useAppSelector } from "@/store"
import clsx from "clsx"
import { useDevices } from "@/hooks/useMediaQuery"

export const ActivationTrigger = ({ type, isEdit, scWillId }: EditFormProps) => {
  const configForm = Form.useFormInstance();
  const { setFieldValue, getFieldValue, getFieldError } = configForm;
  const [selected, setSelected] = useState<string[]>([]);
  const value = getFieldValue('activationTrigger');
  const { address } = useAppSelector(getWalletSlice);
  const [loading, setLoading] = useState(false);
  const { isTablet } = useDevices();

  const configOptions: CustomCheckboxItemProps[] = [
    {
      id: 1,
      title: "Lack of outgoing transactions",
      value: "lack_outgoing_transactions",
      itemChildren: (
        <SelectTime
          name="lackOfOutgoingTxRange"
          title="Time of inactivity until will activation"
          value={getFieldValue('lackOfOutgoingTxRange')}
          handleChangeValue={(value) => setFieldValue('lackOfOutgoingTxRange', value)}
        />
      ),
    },
    {
      id: 2,
      title: "Lack of signed message",
      value: 'lack_signed_message',
      disabled: true,
      itemChildren: <Form.Item
        name="lackOfSignedMsgRange"
        rules={[{ required: true, message: 'Please select an option' }]}
      >
        <SelectTime
          title="Time of inactivity until will activation"
          name="lackOfSignedMsgRange"
          value={getFieldValue('lackOfSignedMsgRange')}
          handleChangeValue={(value) => setFieldValue('lackOfSignedMsgRange', value)}
        />
      </Form.Item>
    }
  ]

  const handleUpdateTrigger = async () => {
    try {
      setLoading(true);
      if (!scWillId) {
        WillToast.error("Will not found, please try again later!");
        return;
      }
      const txError = getFieldError('lackOfOutgoingTxRange');
      if (txError?.length > 0) {
        WillToast.error(txError[0])
        return;
      }
      const lackOfOutgoingTxRange = getFieldValue('lackOfOutgoingTxRange');
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
      const res = await contract?.setActivationTrigger({
        willId: Number(scWillId),
        lackOfOutgoingTxRange
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
      title="Configure activation trigger"
      iconTitle={<TriggerIcon />}
    >
      <Flex vertical gap={24}>
        <Flex vertical gap={16}>
          <Text className="neutral-1">Select one or both</Text>
          <Form.Item
            name="activationTrigger"
            rules={[{ required: true, message: "Please select an option" }]}
          >
            <CheckboxGroup
              checked={value}
              items={configOptions}
              onChange={(value) => setSelected(value as string[])}
            />
          </Form.Item>
        </Flex>
        {type && type === "destruction" && selected?.length === 2 && (
          <Flex align="flex-start" gap={10}>
            <AttentionIcon />
            <Text className="neutral-2">
              You’ve selected both lack of outgoing transactions and signed
              transactions as your trigger. Both conditions will need to be met
              for your will to be activated. Once one of the two activities is
              authorized, your activation duration will be reset.
            </Text>
          </Flex>
        )}
        {
          isEdit ? (
            <AppButton
              type="primary"
              size="xl"
              className={clsx("", !isTablet && "none-styles")}
              onClick={handleUpdateTrigger}
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
