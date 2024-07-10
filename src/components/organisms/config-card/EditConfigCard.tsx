import "./styles.scss"
import { ConfigureIcon } from "@/assets/icons/custom-icon/configure-icon"
import { CartItemContainer } from "../details-card/CardItemContainer"
import { Flex, Form } from "antd"
import { ConfigBeneficiaries } from "./common-card/ConfigBeneficiaries"
import { AssetToBeneficiary } from "./AssetToBeneficiary"
import { AppButton } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { useState } from "react"
import WillToast from "@/components/atoms/ToastMessage"
import { AssetDistribution } from "./common-card/AssetDistribution"
import forwardingWillContract from "@/models/contract/evm/ForwardingWill"
import { PROVIDER_TYPE } from "@/models/contract/evm/contract"
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract"
import { getWalletSlice, useAppSelector } from "@/store"
import { EditFormProps } from "@/components/templates/form"
import { uniqBy } from "lodash"
import { useDevices } from "@/hooks/useMediaQuery"
import { EditAssetDistribution } from "./common-card/EditAssetDistribution"
import clsx from "clsx"

export const EditConfigCard = (props: EditFormProps) => {
  const { scWillId } = props;

  const [loading, setLoading] = useState(false);
  const { address } = useAppSelector(getWalletSlice);
  const configForm = Form.useFormInstance();
  const { getFieldValue } = configForm;
  const { isTablet } = useDevices();

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

  const handleUpdateConfig = async () => {
    try {
      setLoading(true);
      const contractAdd = import.meta.env.VITE_FORWARDING_ROUTER;
      const contract = new forwardingWillContract({
        address: contractAdd,
        provider: {
          type: PROVIDER_TYPE.WALLET,
          injectObject: WALLET_INJECT_OBJ.METAMASK,
        },
      });
      if (!contract) {
        WillToast.error("Contract not found, please try again later!");
        return;
      }
      const beneficiaries = getFieldValue("beneficiariesList");
      const assetDistribution = getFieldValue("assetDistribution");
      const isInValidAsset = beneficiaries?.flatMap((data: any) => data?.assetConfig)
        .some((item: any) => assetDistribution?.findIndex((asset: any) => asset?.assetAddress === item?.asset?.assetAddress) === -1);
      if (isInValidAsset) {
        WillToast.error("There is one asset has not been configured. Please check it and save again.");
        return;
      }
      const isValidConfigBeneficiaries = (
        beneficiaries ?? []
      ).some((item: any) => item?.assetConfig?.length > 0);
      if (!isValidConfigBeneficiaries) {
        WillToast.error(
          "You have to configure at least one beneficiary's asset"
        );
        return;
      }
      if (!checkDividedForwarding(beneficiaries)) {
        WillToast.error(
          "There is one beneficiaries has not be configured. Please check it and save again."
        );
        return;
      }
      const listAssets =
        beneficiaries?.flatMap((data: any) =>
          (data?.assetConfig ?? [])?.map((asset: any) => ({
            ...asset?.asset,
            percent: asset?.percent,
          }))
        ) || [];
      const distinctAsset = uniqBy(listAssets, "value");
      const assetPercents = distinctAsset?.map((asset: any) => ({
        ...asset,
        symbol: asset?.value,
        percent: listAssets?.reduce((acc: number, item: any) => {
          if (item?.value === asset?.value) {
            return acc + (item?.percent ? Number(item?.percent) : 0);
          }
          return acc;
        }, 0),
      }));
      const checkIsNotDonePercent = assetPercents?.some(
        (asset) => asset?.percent !== 100
      );
      if (checkIsNotDonePercent) {
        WillToast.error("Total percentage have to be 100");
        return;
      }
      const initBeneficiaries = getFieldValue("initBeneficiaries") ?? [];

      const nickNames = [
        ...beneficiaries?.map((beneficiary: any) => beneficiary?.name),
        ...initBeneficiaries?.reduce((acc: any, beneficiary: any) => {
          const checkExist = beneficiaries?.findIndex((item: any) => item?.address === beneficiary?.address);
          if (checkExist === -1) {
            return [...acc, beneficiary?.name];
          }
          return acc;
        }, []),
      ]
      const newAsset = uniqBy(
        beneficiaries?.flatMap((data: any) =>
          (data?.assetConfig ?? [])?.map((asset: any) => ({
            ...asset?.asset,
            percent: asset?.percent ? Number(asset?.percent) : 0,
            address: asset?.asset?.assetAddress,
          }))
        ) || []
        , "value");
      const initAsset = uniqBy(
        initBeneficiaries?.flatMap((data: any) =>
          (data?.assetConfig ?? []).map((asset: any) => ({
            ...asset?.asset,
            percent: asset?.percent ? Number(asset?.percent) : 0,
          }))
        ) || []
        ,
        "value"
      );
      const currentAsset = [
        ...newAsset,
        ...initAsset?.reduce((acc: any, item: any) => {
          const checkExist = newAsset?.findIndex((asset: any) => asset?.value === item?.value);
          if (checkExist === -1) {
            return [...acc, {
              ...item,
              percent: 0,
            }];
          }
          return acc;
        }, []),
      ]

      const newDistributions = beneficiaries?.map((beneficiary: any) => ([
        beneficiary?.address,
        currentAsset?.map((asset: any) => asset?.address),
        currentAsset?.map((asset: any) => {
          const checkExist = beneficiary?.assetConfig?.findIndex((item: any) => item?.asset?.value === asset?.value);
          if (checkExist > -1) {
            const percent = beneficiary?.assetConfig[checkExist]?.percent;
            return percent ? Number(percent) : 0;
          }
          return 0;
        }),
      ]))
      const distributions = [
        ...newDistributions,
        ...initBeneficiaries?.filter((beneficiary: any) =>
          beneficiaries?.findIndex((item: any) => item?.address === beneficiary?.address) === -1
        )?.map((beneficiary: any) => ([
          beneficiary?.address,
          currentAsset?.map((asset: any) => asset?.address),
          currentAsset?.map(() => 0),
        ])),

      ];

      const params = {
        willId: Number(scWillId),
        nickNames,
        distributions,
        minRequiredSigs: getFieldValue("minRequiredSignatures"),
      }

      const res = await contract.updateWillAssetsDistribution(params);

      const estGas = await res?.estimateGas({
        from: address,
      });

      const res2 = await res.send({
        from: address,
        gas: estGas.toString(),
      });
      if (res2) {
        WillToast.success("Edit asset to beneficiaries successfully");
      }
    } catch (error: any) {
      WillToast.error(error?.message)
    } finally {
      setLoading(false);
    }
  }

  return (
    <CartItemContainer
      title="Configure"
      iconTitle={<ConfigureIcon />}
    >
      <Flex vertical gap={16} className="update-config">
        <ConfigBeneficiaries hasIcon={false} isDisclosure={isTablet ? true : false} />
        <EditAssetDistribution {...props} hasIcon={false} isDisclosure={isTablet ? true : false} />
        <AssetToBeneficiary {...props} hasIcon={false} isDisclosure={isTablet ? true : false} />
        <AppButton
          type="primary"
          size="xl"
          className={clsx("", !isTablet && "none-styles")}
          onClick={handleUpdateConfig}
          loading={loading}
        >
          <Text className="uppercase" size="text-lg">Save</Text>
        </AppButton>
      </Flex>
    </CartItemContainer>
  )
}