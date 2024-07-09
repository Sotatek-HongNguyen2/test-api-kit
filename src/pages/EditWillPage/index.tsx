import { Flex, Form, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { WillTypeCard } from "@/components/organisms";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { WillForm } from "@/components/templates/form";
import WillToast from "@/components/atoms/ToastMessage";
import { WillData } from "@/types";
import { ConfigFormDataType } from "../ConfigWillPage";
import { WillServices } from "@/services/will-service";
import formatNumber from "@/helpers/useFormatToken";

export function EditWillPage() {
  const { willId } = useParams();

  const [form] = Form.useForm<ConfigFormDataType>();
  const { setFieldsValue } = form;
  const willService = new WillServices();
  const [willDetail, setWillDetail] = useState<WillData | null>(null);

  if (!willId) return null;

  const getTooltip = (data: any) => {
    return (
      <Tooltip title={data} placement="top">
        {formatNumber(Number(data))}
      </Tooltip>
    );
  };

  const getAmount = (willDetail: any, asset: any, ownerBalance: any) => {
    console.log(
      willDetail,
      asset,
      ownerBalance,
      "willDetail, asset, ownerBalance"
    );
    if (ownerBalance && ownerBalance?.symbol === "ETH") {
      return Number(willDetail.willBalance ?? 0) > Number(ownerBalance?.balance)
        ? getTooltip(ownerBalance?.balance)
        : getTooltip(willDetail.willBalance);
    }
    return Number(asset?.amount ?? 0) > Number(ownerBalance?.balance)
      ? getTooltip(ownerBalance?.balance)
      : getTooltip(asset?.amount);
  };

  const setFormValue = useCallback(async () => {
    try {
      const data = await willService.getWillDetail({ willId });
      const activationTrigger = [];
      data?.lackTransaction &&
        activationTrigger.push("lack_outgoing_transactions");
      data?.lackSignedMessage && activationTrigger.push("lack_signed_message");

      const assetDistribution = (data?.willAsset ?? []).flatMap((item: any) =>
        data?.ownerBalance
          ?.filter((balance: any) => balance?.address === item?.asset)
          ?.map((balance: any) => {
            return {
              ...balance,
              assetAddress: balance?.address,
              amount: getAmount(data, item, balance),
            };
          })
      );
      const beneficiariesList = (data?.willDetail ?? [])?.map(
        (beneficiary: any) => ({
          ...beneficiary,
          address: beneficiary?.walletAddress,
          avatar: beneficiary?.user?.avatar,
          assetConfig: !beneficiary?.fwDetailAsset
            ? []
            : beneficiary?.fwDetailAsset?.map((item: any) => ({
              percent: item?.percent,
              asset: {
                assetAddress: item?.asset,
                value: data?.ownerBalance?.find(
                  (balance: any) => balance?.address === item?.asset
                )?.symbol,
                ...data?.ownerBalance?.find(
                  (balance: any) => balance?.address === item?.asset
                ),
              },
            })),
        })
      );
      setFieldsValue({
        willName: data?.name,
        note: data?.note,
        minRequiredSignatures: data?.minSignature,
        activationTrigger: activationTrigger,
        lackOfOutgoingTxRange: [6, 12, 24].includes(data?.lackTransaction)
          ? data?.lackTransaction
          : "custom",
        lackOfOutgoingTxRange_customTime: data?.lackTransaction,
        lackOfSignedMsgRange: [6, 12, 24].includes(data?.lackSignMessage)
          ? data?.lackSignMessage
          : "custom",
        lackOfSignedMsgRange_customTime: data?.lackSignMessage,
        beneficiaries: "existing",
        beneficiariesList: beneficiariesList,
        initBeneficiaries: beneficiariesList,
        assetDistribution: assetDistribution,
      });
      setWillDetail(data);
    } catch (error: any) {
      WillToast.error(error.message);
    }
  }, [willId, setFieldsValue]);

  useEffect(() => {
    setFormValue();
  }, []);

  if (!willDetail) return null;

  return (
    <WrapperContainer title="Configure your will">
      <Form form={form} autoComplete="off">
        <Flex vertical gap={16}>
          <WillTypeCard type={willDetail?.type} />
          <WillForm
            type={willDetail?.type}
            isEdit={true}
            scWillId={willDetail?.scWillId}
            willAddress={willDetail?.address}
          />
        </Flex>
      </Form>
    </WrapperContainer>
  );
}
