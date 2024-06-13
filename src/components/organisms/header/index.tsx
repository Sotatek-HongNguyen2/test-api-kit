import { Flex } from "antd";

import "./styles.scss";

import { ConfigIcon, FAQIcon } from "@/assets/icons/custom-icon";
import { IconButton } from "@/components/atoms/button";
import WillImage from "@/components/atoms/Image";
import logo from "@/assets/images/layout/logo.png";
import { ConnectButton } from "@/components/molecules";

import { useHandleLogin } from "@/hooks/useHandleLogin";

import LoginModal from "../LoginModal";

export const Header = () => {
  const { handelClickOptionLogin, isOpen, setIsOpen, loadingLogin } =
    useHandleLogin();

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
  };

  return (
    <Flex id="app-header" justify="space-between" align="center">
      <WillImage src={logo} />
      <Flex gap={20} align="center">
        <ConnectButton clickLogin={handelOpenModalLogin} />
        <Flex align="center">
          <IconButton>
            <ConfigIcon />
          </IconButton>
          <IconButton>
            <FAQIcon />
          </IconButton>
        </Flex>

        <LoginModal
          loading={loadingLogin}
          clickOptionLogin={handelClickOptionLogin}
          open={isOpen}
          handleCancel={() => {
            setIsOpen(false);
          }}
        />
      </Flex>
    </Flex>
  );
};
