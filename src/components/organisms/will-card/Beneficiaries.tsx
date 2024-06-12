import { Text } from "@/components/atoms/text"
import { BeneficiaryData } from "@/types"
import { Flex } from "antd"
import { UserOutlined } from "@ant-design/icons";

export const Beneficiaries = ({ beneficiaries }: { beneficiaries: BeneficiaryData[] }) => {
  return (
    <Flex vertical gap="12px">
      <Text className="font-semibold">Beneficiaries ({beneficiaries?.length ?? 0})</Text>
      <Flex gap="30px">
        {
          (beneficiaries ?? []).map((beneficiary, index) => (
            <Flex key={`beneficiary-${index}`} gap="10px">
              <UserOutlined className="user-icon" />
              <Text>{beneficiary?.walletAddress?.substring(0, 6)}...{beneficiary?.walletAddress?.substring(beneficiary?.walletAddress?.length - 5, beneficiary?.walletAddress?.length - 1)}</Text>
            </Flex>
          ))
        }
      </Flex>
    </Flex>
  )
}