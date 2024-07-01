import WillModal from "@/components/atoms/modal";
import "./styles.scss";
import { AppButton } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";

import { PlusOutlined } from "@ant-design/icons";
import { Col, Flex, Row } from "antd";

import useDisclosure from "@/hooks/useDisclosure";

import { useCallback, useEffect, useRef, useState } from "react";

import { WillType } from "@/types";
import {
  DestructionIcon,
  ForwardingIcon,
  InheritanceIcon,
} from "@/assets/icons/custom-icon";
import { WillTypeCard } from "@/components/molecules/will-type-card";

import { useNavigate } from "react-router-dom";

import { APP_ROUTES_PATHS } from "@/constants";
import clsx from "clsx";
import { debounce } from "lodash";

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
    description:
      "When activated, a designated number of signatures will be required for beneficiaries to access the wallet.",
    type: "inheritance",
  },
  {
    icon: <ForwardingIcon />,
    title: "Forwarding",
    description:
      "When activated, assets designated by the owner will be sent directly to the public addresses of listed beneficiaries.",
    type: "forwarding",
  },
  // {
  //   icon: <DestructionIcon />,
  //   title: "Destruction",
  //   description:
  //     "When activated, all assets will be sent to the Ethereum genesis address, thus destroyed permanently.",
  //   type: "destruction",
  // },
];

export const WillTypeModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [willType, setWillType] = useState<WillType | null>(null);
  const navigate = useNavigate();
  const {
    isOpen: isShowFooter,
    onOpen: showFooter,
    onClose: hideFooter,
  } = useDisclosure();
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (buttonRef.current) {
        const buttonPosition = buttonRef.current.getBoundingClientRect().top;
        if (buttonPosition < 0 && !isShowFooter) {
          showFooter();
        } else {
          hideFooter();
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const createAWill = () => {
    navigate(`${APP_ROUTES_PATHS.CONFIG_WILL}/${willType}`);
    onClose();
  };

  return (
    <div className="will-tab-modal">
      <Flex ref={buttonRef}>
        <AppButton
          type="primary"
          size="xl"
          icon={<PlusOutlined />}
          onClick={onOpen}
        >
          <Text size="text-lg" className="uppercase font-bold">
            Create a Will
          </Text>
        </AppButton>
      </Flex>

      <Flex className={clsx("", isShowFooter ? "show-footer" : "hide-footer")}>
        <AppButton
          type="primary"
          size="xl"
          icon={<PlusOutlined />}
          onClick={onOpen}
        >
          <Text size="text-lg" className="uppercase font-bold">
            Create a Will
          </Text>
        </AppButton>
      </Flex>
      <WillModal
        width={672}
        open={isOpen}
        handleCancel={() => {
          onClose();
          setWillType(null);
        }}
        title={
          <Text size="text-3xl" className="font-bold neutral-1">
            Choose will type
          </Text>
        }
        hideFooter
      >
        <Flex vertical gap={24}>
          <Flex gap={24} align="center">
            {willTypeItems?.map((item, index) => (
              <WillTypeCard
                key={`${item?.type}-${index}`}
                {...item}
                active={willType === item?.type}
                onClick={() => setWillType(item?.type)}
              />
            ))}
          </Flex>

          <Row gutter={24}>
            <Col span={12}>
              <AppButton
                size="xl"
                block
                onClick={() => {
                  onClose();
                  setWillType(null);
                }}
              >
                <Text size="text-lg" className="neutral-1 font-bold uppercase">
                  Cancel
                </Text>
              </AppButton>
            </Col>
            <Col span={12}>
              <AppButton
                block
                size="xl"
                type="primary"
                onClick={createAWill}
                disabled={!willType}
              >
                <Text size="text-lg" className="neutral-3 font-bold uppercase">
                  create a will
                </Text>
              </AppButton>
            </Col>
          </Row>
        </Flex>
      </WillModal>
    </div>
  );
};
