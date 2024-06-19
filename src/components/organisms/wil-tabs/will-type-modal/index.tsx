import WillModal from "@/components/atoms/modal"
import "./styles.scss"
import { AppButton } from "@/components/atoms/button"
import { Text } from "@/components/atoms/text"
import { PlusOutlined } from "@ant-design/icons"
import { Flex } from "antd"
import useDisclosure from "@/hooks/useDisclosure"
import { useState } from "react"
import { WillType } from "@/types"
import { DestructionIcon, ForwardingIcon, InheritanceIcon } from "@/assets/icons/custom-icon"
import { WillTypeCard } from "@/components/molecules/will-type-card"
import { useNavigate } from "react-router-dom"
import { APP_ROUTES_PATHS } from "@/constants"

export interface WillTypeItem {
  icon: React.ReactNode;
  title: string;
  description: string;
  type: WillType;
}

const willTypeItems: WillTypeItem[] = [
  {
    icon: <InheritanceIcon />,
    title: "Inheritance",
    description: "When activated, a designated number of signatures will be required for beneficiaries to access the wallet.",
    type: "inheritance"
  },
  {
    icon: <ForwardingIcon />,
    title: "Forwarding",
    description: "When activated, assets designated by the owner will be sent directly to the public addresses of listed beneficiaries.",
    type: "forwarding"
  },
  {
    icon: <DestructionIcon />,
    title: "Destruction",
    description: "When activated, all assets will be sent to the Ethereum genesis address, thus destroyed permanently.",
    type: "destruction"
  }

]

export const WillTypeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [willType, setWillType] = useState<WillType>("inheritance");
  const navigate = useNavigate();

  const createAWill = () => {
    navigate(`${APP_ROUTES_PATHS.CONFIG_WILL}/${willType}`);
    onClose();
  };

  return (
    <>
      <AppButton type="primary" size="xl" icon={<PlusOutlined />} onClick={onOpen}>
        <Text size="text-lg" className="uppercase font-bold" >Create a Will</Text>
      </AppButton>
      <WillModal
        open={isOpen}
        handleCancel={onClose}
        title={<Text size="text-3xl" className="font-bold neutral-1">Choose Will Type</Text>}
        hideFooter
      >
        <Flex vertical gap={24}>
          <Flex gap={16} align="center">
            {
              willTypeItems?.map((item, index) => (
                <WillTypeCard
                  key={`${item?.type}-${index}`}
                  {...item}
                  active={willType === item?.type}
                  onClick={() => setWillType(item?.type)}
                />
              ))
            }
          </Flex>
          <Flex justify="space-between" align="center">
            <AppButton size="xl" onClick={onClose}>
              <Text size="text-lg" className="neutral-1 font-bold uppercase">Cancel</Text>
            </AppButton>
            <AppButton size="xl" type="primary" onClick={createAWill}>
              <Text size="text-lg" className="neutral-3 font-bold uppercase">create a will</Text>
            </AppButton>
          </Flex>
        </Flex>
      </WillModal>
    </>
  )
}