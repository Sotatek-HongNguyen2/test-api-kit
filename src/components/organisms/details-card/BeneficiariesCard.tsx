import "./styles.scss";
import { AssetDetailData, WillData } from "@/types"
import { CartItemContainer } from "./CardItemContainer"
import { BeneficiariesIcon, CopyIcon, UserOutlinedIcon } from "@/assets/icons/custom-icon";
import { AppTable } from "@/components/molecules/table";
import { ColumnsType } from "antd/es/table";
import { Text } from "@/components/atoms/text";
import { Flex } from "antd";
import { IconButton } from "@/components/atoms/button";
import { useCopyToClipBoard } from "@/hooks/useCopyToClipboard";

interface BeneficiariesCardProps {
  beneficiaries: AssetDetailData[];
  minSignature: WillData['minSignature'];
}

const NameWithAvt = ({ name, avatar }: { name: string, avatar?: string }) => {
  return (
    <Flex gap="10px" className="name-with-avt">
      {
        avatar ? <img src={avatar} alt={name} className="avatar" /> : <UserOutlinedIcon />
      }
      <Text className="font-semibold neutral-1">{name}</Text>
    </Flex>
  )
}

export const BeneficiariesCard = ({ beneficiaries, minSignature }: BeneficiariesCardProps) => {
  const { handleCopyToClipboard } = useCopyToClipBoard();

  const columns: ColumnsType<AssetDetailData> = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (name, record) => <NameWithAvt name={name} avatar={record?.user?.avatar} />
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
      iconTitle={<BeneficiariesIcon />}
    >
      <Flex vertical gap={24}>
        <AppTable dataSource={beneficiaries} columns={columns} pagination={false} />
        <Text className="neutral-2">
          Your will consists of the following addresses as the beneficiaries once your will is activated.
        </Text>
        <Text className="neutral-1">
          This will requires a minimum of {minSignature} signature{minSignature > 1 ? 's' : ''} for wallet access.
        </Text>
      </Flex>

    </CartItemContainer>
  )
}