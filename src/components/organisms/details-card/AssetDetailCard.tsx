import "./styles.scss";
import { AssetData, AssetDetailData, BeneficiaryData, FWDetailAsset } from "@/types"
import { CartItemContainer } from "./CardItemContainer"
import { DiamondIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { ColumnsType } from "antd/es/table";
import { AssetName } from "@/components/molecules/asset-item/AssetName";
import { Text } from "@/components/atoms/text";
import { BeneficiaryName } from "@/components/molecules/asset-item/BeneficiaryName";
import { Flex } from "antd";
import { useState } from "react";

interface AssetCardProps {
  beneficiaries: AssetDetailData[];
  currentBeneficiary: AssetDetailData;
  setCurrentBeneficiary: (beneficiary: AssetDetailData) => void;
}

const Beneficiaries = (props: AssetCardProps) => {
  const { beneficiaries, currentBeneficiary, setCurrentBeneficiary } = props;
  return (
    <Flex gap={8} className="beneficiary-list">
      {
        (beneficiaries ?? []).map((beneficiary, index) => (
          <BeneficiaryName
            key={index}
            name={beneficiary.name}
            isActive={currentBeneficiary?.id === beneficiary.id}
            onClick={() => setCurrentBeneficiary(beneficiary)}
          />
        ))
      }
    </Flex>
  )
}

export const AssetDetailCard = ({ beneficiaries }: Pick<AssetCardProps, 'beneficiaries'>) => {
  const [currentBeneficiary, setCurrentBeneficiary] = useState<AssetDetailData>(beneficiaries[0]);
  const assets = currentBeneficiary?.fwDetailAsset ?? [] as FWDetailAsset[];
  console.log("assets: ", assets);

  const columns: ColumnsType<FWDetailAsset> = [
    {
      title: 'Token',
      dataIndex: 'asset',
      key: 'asset',
      // render: (_, asset) => <AssetName asset={asset} />
    },
    {
      title: 'Inheritance Percentage (%)',
      dataIndex: 'percentage',
      key: 'percentage',
      render: (_, asset) => <Text size="text-md" className="neutral-1 font-semibold">{asset?.percent} %</Text>
    },
  ];

  return (
    <CartItemContainer
      title="Asset details"
      iconTitle={<DiamondIcon />}
    >
      <Flex vertical gap={16}>
        <Text className="neutral-1">You’re a designated beneficiary of the following assets:</Text>
        <Beneficiaries
          beneficiaries={beneficiaries}
          currentBeneficiary={currentBeneficiary}
          setCurrentBeneficiary={setCurrentBeneficiary}
        />
        <AppTable dataSource={assets} columns={columns} pagination={false} />
      </Flex>
    </CartItemContainer>
  )
}