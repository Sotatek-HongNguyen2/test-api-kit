import "./styles.scss";
import { Flex, Form } from "antd";
import { useMemo, useState } from "react";
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
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { uniqBy } from "lodash";

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
  const assetPercents = useMemo(() => {
    const listAssets = watchBeneficiary?.flatMap((data: any) => (data?.assetConfig ?? [])?.map((asset: any) => ({
      ...asset?.asset,
      percent: asset?.percent
    }))) || [];
    const distinctAsset = uniqBy(listAssets, "value");
    return distinctAsset?.map((asset: any) => ({
      ...asset,
      symbol: asset?.value,
      percent: listAssets?.reduce((acc: number, item: any) => {
        if (item?.value === asset?.value) {
          return acc + (item?.percent ?? 0);
        }
        return acc;
      }, 0)
    }))
  }, [watchBeneficiary])

  const columns: ColumnsType<any> = [
    {
      title: 'Token',
      dataIndex: 'token',
      key: 'token',
      render: (_, record) => <AssetName asset={record} />
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

  const totalColumn: ColumnsType<any> = [
    {
      title: "Token",
      dataIndex: "token",
      key: "token",
      render: (_, record) => <AssetName asset={record} />
    },
    {
      title: "Total used Percentage (%)",
      dataIndex: "percent",
      key: "percent",
      render: (percent) => (
        <Text className="neutral-1 font-semibold">{percent}%</Text>
      ),
    },
  ];

  const handleAddConfigAsset = (asset: AssetSelectType, percent: number) => {
    const currentBeneficiaries = getFieldValue("beneficiariesList") || [];
    if (percent > 100) {
      WillToast.error("Percentage must be less than 100");
      return 0;
    }

    const checkAssetExist = assets?.find(
      (item) => item?.value === asset?.value
    );
    if (checkAssetExist) { // check total percent for current beneficiary
      const totalPercent = assetPercents?.find(
        (item) => item?.value === asset?.value
      );
      const newPercent = totalPercent?.percent - checkAssetExist?.amount + percent;
      if (newPercent > 100) {
        WillToast.error(
          "Total percentage have to be 100"
        );
        return 0;
      }
      const newAssets = assets.map((item) => {
        if (item?.value === asset?.value) {
          return {
            ...item,
            amount: percent,
            symbol: asset?.value as string
          };
        }
        return item;
      });
      setAssets(newAssets);
    } else {
      const percentExist = assetPercents?.find(
        (item) => item?.value === asset?.value
      );
      if (percentExist) {
        if (percentExist?.percent + percent > 100) {
          WillToast.error(
            "Total percentage have to be 100"
          );
          return 0;
        }
      }
      setAssets(
        (pre) =>
          [
            ...pre,
            {
              token: asset?.label,
              amount: percent, // percentage
              value: asset?.value as string,
              symbol: asset?.value as string,
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
    return 1;
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
          symbol: item?.asset?.value as string
        }))
      );
    } else {
      setAssets([]);
    }
  };

  return (
    <CartItemContainer
      title="Configure asset to beneficiary"
      iconTitle={<NoteIcon />}
    >
      <Flex vertical gap={16}>
        <Text>You’re a designated beneficiary of the following assets:</Text>
        <AppTable
          columns={totalColumn}
          dataSource={assetPercents}
          pagination={false}
        />
        <Flex gap={16} className="list-beneficiary--card">
          {watchBeneficiary?.map((beneficiary: any) => (
            <BeneficiaryName
              key={beneficiary?.address}
              name={beneficiary?.name}
              onClick={() => changeCurrentSelected(beneficiary)}
              isActive={currentSelected?.address === beneficiary?.address}
            />
          ))}
        </Flex>
        <AppTable
          className={`${assets && assets.length > 0 && "have-data"}`}
          columns={columns}
          dataSource={assets ?? []}
          hasIconAction
          pagination={false}
        />
        <ConfigAsset
          handleAddConfigAsset={handleAddConfigAsset}
          selectedAssets={assets}
          currentBeneficiary={currentSelected}
        />
      </Flex>
    </CartItemContainer>
  );
};
