import { AssetDetailData } from "@/types"
import { CartItemContainer } from "./CardItemContainer"
import { CopyIcon, DiamondIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { ColumnsType } from "antd/es/table";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { IconButton } from "@/components/atoms/button";
import { useCopyToClipBoard } from "@/hooks/useCopyToClipboard";

interface BeneficiariesCardProps {
  beneficiaries: AssetDetailData[];
}

const NameWithAvt = ({ name }: { name: string }) => {
  return (
    <Flex gap="10px">
      <UserOutlined className="user-icon" />
      <Text className="font-semibold neutral-1">{name}</Text>
    </Flex>
  )
}

export const BeneficiariesCard = ({ beneficiaries }: BeneficiariesCardProps) => {
  const { handleCopyToClipboard } = useCopyToClipBoard();

  const columns: ColumnsType<AssetDetailData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name) => <NameWithAvt name={name} />
    },
    {
      title: 'Owner address',
      dataIndex: 'walletAddress',
      key: 'walletAddress',
      render: (walletAddress) => (
        <Flex align="center" justify="flex-end">
          <Text size="text-md" className="neutral-1">{walletAddress}</Text>
          <IconButton onClick={() => handleCopyToClipboard(walletAddress)}>
            <CopyIcon />
          </IconButton>
        </Flex>
      )
    },
  ];

  return (
    <CartItemContainer
      title={`List of beneficiaries (${beneficiaries?.length ?? 0})`}
      iconTitle={<DiamondIcon />}
    >
      <Flex vertical gap={24}>
        <AppTable dataSource={beneficiaries} columns={columns} pagination={false} />
        <Text className="neutral-2">Your will consists of the following addresses as the beneficiaries once your will is activated.</Text>
      </Flex>

    </CartItemContainer>
  )
}