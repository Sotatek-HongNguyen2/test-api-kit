import { Flex } from "antd";

import "./styles.scss";

import { useNavigate } from "react-router-dom";

import { ConfigIcon, FAQIcon } from "@/assets/icons/custom-icon";
import { AppButton, IconButton } from "@/components/atoms/button";
import WillImage from "@/components/atoms/Image";
import logo from "@/assets/images/layout/logo.png";
import { ConnectButton } from "@/components/molecules";
import { useHandleLogin } from "@/hooks/useHandleLogin";
import { APP_ROUTES_PATHS } from "@/constants";

import LoginModal from "../LoginModal";

export const Header = () => {
  const { handelClickOptionLogin, isOpen, setIsOpen, loadingLogin } =
    useHandleLogin();
  const navigate = useNavigate();

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
  };

  return (
    <Flex id="app-header" justify="space-between" align="center">
      <AppButton
        type="link"
        className="none-styles"
        onClick={() => navigate(APP_ROUTES_PATHS.HOME)}
      >
        <WillImage src={logo} />
      </AppButton>
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
