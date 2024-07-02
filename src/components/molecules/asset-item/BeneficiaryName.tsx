import { Card } from "@/components/atoms/card";
import { Flex } from "antd";
import { Text } from "@/components/atoms/text";
import clsx from "clsx";
import { UserOutlinedIcon } from "@/assets/icons/custom-icon";

interface BeneficiaryNameProps {
  name: string;
  isActive?: boolean;
  onClick?: () => void;
}

export const BeneficiaryName = (props: BeneficiaryNameProps) => {
  const { name, isActive = false, onClick } = props;
  return (
    <Card boxShadow="none" radius="medium" className={clsx("beneficiary-card", isActive && "active-card")} onClick={onClick}>
      <Flex gap={10} align="center">
        <UserOutlinedIcon />
        <Text className="neutral-1 font-semibold">{name}</Text>
      </Flex>
    </Card>
  )
};