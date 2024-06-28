import { Flex, Form } from "antd";
import { useState } from "react";
import { ColumnsType } from "antd/es/table";

import { Text } from "@/components/atoms/text";
import { NoteIcon, TrashIcon } from "@/assets/icons/custom-icon";
import { BeneficiaryName } from "@/components/molecules/asset-item/BeneficiaryName";
import { BeneficiaryData } from "@/types";
import { AppTable } from "@/components/molecules/table";
import { IconButton } from "@/components/atoms/button";
import { ConfigAsset } from "@/components/molecules/asset-item/ConfigAsset";
import WillToast from "@/components/atoms/ToastMessage";

import { AssetDataColumn, AssetSelectType } from "./AddAssetDistributionForm";
import { CartItemContainer } from "../details-card/CardItemContainer";

export interface BeneficiaryConfig extends BeneficiaryData {
  assetConfig: {
    asset: AssetSelectType;
    percent: number;
  }[];
}

export const AssetToBeneficiary = () => {
  const configForm = Form.useFormInstance();
  const { getFieldValue, setFieldValue } = configForm;
  const watchBeneficiary = Form.useWatch("beneficiariesList", configForm);

  const [currentSelected, setCurrentSelected] =
    useState<BeneficiaryData | null>(null);
  const [assets, setAssets] = useState<AssetDataColumn[]>([]);

  const columns: ColumnsType<any> = [
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
    },
    {
      title: "Inheritance Percentage (%)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => (
        <Text className="neutral-1 font-semibold">{amount}%</Text>
      ),
    },
    {
      title: "",
      dataIndex: "",
      key: "",
      render: (_, record) => (
        <IconButton
          onClick={() => {
            setAssets((pre) =>
              pre.filter((asset) => asset?.value !== record?.value)
            );
            const currentBeneficiaries =
              getFieldValue("beneficiariesList") || [];
            const newBeneficiaries = currentBeneficiaries.map(
              (beneficiary: BeneficiaryConfig) => {
                if (beneficiary?.address === currentSelected?.address) {
                  return {
                    ...beneficiary,
                    assetConfig: null,
                  };
                }
                return beneficiary;
              }
            );
            setFieldValue("beneficiariesList", newBeneficiaries);
          }}
        >
          <TrashIcon />
        </IconButton>
      ),
    },
  ];

  const handleAddConfigAsset = (asset: AssetSelectType, percent: number) => {
    const currentBeneficiaries = getFieldValue("beneficiariesList") || [];
    if (percent > 100) {
      WillToast.error("Percentage must be less than 100");
      return;
    }
    const checkExist = assets?.findIndex(
      (item) => item?.value === asset?.value
    );
    if (checkExist > -1) {
      const totalCurrentPercent = currentBeneficiaries?.reduce(
        (acc: number, beneficiary: BeneficiaryConfig) => {
          if (beneficiary?.address === currentSelected?.address) {
            return acc + percent;
          }
          return (
            acc +
            beneficiary?.assetConfig?.reduce(
              (acc: number, item) =>
                acc + (item?.asset?.value === asset?.value ? item?.percent : 0),
              0
            )
          );
        },
        0
      );
      if (totalCurrentPercent > 100) {
        WillToast.error(
          `Adding ${asset?.title} percentage exceeds the total allowed percentage of 100%`
        );
        return;
      }
      const newAssets = assets.map((item) => {
        if (item?.value === asset?.value) {
          return {
            ...item,
            amount: percent,
          };
        }
        return item;
      });
      setAssets(newAssets);
    } else {
      const totalCurrentPercent = currentBeneficiaries?.reduce(
        (acc: number, item: BeneficiaryConfig) => {
          const totalPercent = item?.assetConfig?.reduce(
            (acc: number, item) =>
              acc + (item?.asset?.value === asset?.value ? item?.percent : 0),
            0
          );
          return acc + totalPercent;
        },
        0
      );
      if (totalCurrentPercent + percent > 100) {
        WillToast.error(
          `Adding ${asset?.title} percentage exceeds the total allowed percentage of 100%`
        );
        return;
      }
      setAssets(
        (pre) =>
          [
            ...pre,
            {
              token: asset?.label,
              amount: percent, // percentage
              value: asset?.value as string,
            },
          ] as any
      );
    }
    const newBeneficiaries = currentBeneficiaries.map(
      (beneficiary: BeneficiaryConfig) => {
        if (beneficiary?.address === currentSelected?.address) {
          const checkExist = beneficiary?.assetConfig?.findIndex(
            (item) => item?.asset?.value === asset?.value
          );
          return {
            ...beneficiary,
            assetConfig:
              checkExist > -1
                ? (beneficiary?.assetConfig || [])?.map((item) => {
                    if (item?.asset?.value === asset?.value) {
                      return {
                        asset,
                        percent,
                      };
                    }
                    return item;
                  })
                : [
                    ...(beneficiary?.assetConfig || []),
                    {
                      asset,
                      percent,
                    },
                  ],
          };
        }
        return beneficiary;
      }
    );
    setFieldValue("beneficiariesList", newBeneficiaries);
  };

  const changeCurrentSelected = (beneficiary: BeneficiaryData) => {
    setCurrentSelected(beneficiary);
    const beneficiaries = getFieldValue("beneficiariesList") || [];
    const currentBeneficiary = beneficiaries.find(
      (item: BeneficiaryConfig) => item?.address === beneficiary?.address
    );
    if (currentBeneficiary?.assetConfig) {
      setAssets(
        currentBeneficiary?.assetConfig?.map((item: any) => ({
          token: item?.asset?.label,
          amount: item?.percent,
          value: item?.asset?.value as string,
        }))
      );
    } else {
      setAssets([]);
    }
  };

  if (!watchBeneficiary || watchBeneficiary?.length === 0) return null;

  return (
    <CartItemContainer
      title="Configure asset to beneficiary"
      iconTitle={<NoteIcon />}
    >
      <Flex vertical gap={16}>
        <Text>You’re a designated beneficiary of the following assets:</Text>
        <Flex gap={16}>
          {watchBeneficiary?.map((beneficiary: any) => (
            <BeneficiaryName
              key={beneficiary?.address}
              name={beneficiary?.name}
              onClick={() => changeCurrentSelected(beneficiary)}
              isActive={currentSelected?.address === beneficiary?.address}
            />
          ))}
        </Flex>
        {currentSelected && (
          <>
            {assets?.length > 0 && (
              <AppTable
                columns={columns}
                dataSource={assets}
                hasIconAction
                pagination={false}
              />
            )}
            <ConfigAsset handleAddConfigAsset={handleAddConfigAsset} />
          </>
        )}
      </Flex>
    </CartItemContainer>
  );
};
