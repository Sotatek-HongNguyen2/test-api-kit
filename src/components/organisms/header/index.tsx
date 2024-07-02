import { Avatar, Col, Drawer, Flex, Menu, Row, Space } from "antd";
import { CloseOutlined } from "@ant-design/icons";

import "./styles.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MenuProps } from "rc-menu";

import { ConfigIcon, FAQIcon, MenuIcon } from "@/assets/icons/custom-icon";
import { AppButton, IconButton } from "@/components/atoms/button";
import WillImage from "@/components/atoms/Image";
import logo from "@/assets/images/layout/logo.png";
import { ConnectButton } from "@/components/molecules";
import { useHandleLogin } from "@/hooks/useHandleLogin";
import { APP_ROUTES_PATHS } from "@/constants";
import { useDevices } from "@/hooks/useMediaQuery";
import { NoAvatar36 } from "@/assets/icons";
import {
  getAuthSlide,
  getInformationInstanceSlide,
  useAppSelector,
} from "@/store";

import LoginModal from "../LoginModal";

type MenuItem = Required<MenuProps>["items"][number];

export const Header = () => {
  const { handelClickOptionLogin, isOpen, setIsOpen, loadingLogin } =
    useHandleLogin();
  const navigate = useNavigate();
  const { accessToken } = useAppSelector(getAuthSlide);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [open, setOpen] = useState<boolean>(false);
  const { isTablet } = useDevices();
  const { avatar, name } = useAppSelector(getInformationInstanceSlide);
  const [activeKey, setActiveKey] = useState<string>("1");
  const location = useLocation();

  const handelOpenModalLogin = async () => {
    await setOpen(false);
    setIsOpen(true);
  };
  const items: MenuItem[] = [
    {
      key: "0",
      label: (
        <div className="item-user">
          {previewImage ? (
            <Avatar src={previewImage} size={36} />
          ) : (
            <NoAvatar36 />
          )}
          <div>{name}</div>
        </div>
      ),
    },
    {
      type: "divider",
    },
    { key: "1", label: "My Will" },
    { key: "2", label: "My Inherited Will" },
  ];

  const getInformation = async () => {
    // const res = await authServices.getInformation();

    setPreviewImage(avatar);
  };

  useEffect(() => {
    getInformation();
  }, [avatar]);

  const itemDesktop = () => {
    return (
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
      </Flex>
    );
  };

  const handleChange = (e: any) => {
    setOpen(false);
    setActiveKey(e.key);
    if (e.key === "0") {
      navigate("/user-profile");
    } else {
      if (location.pathname !== "/") {
        navigate(`/?typeWill=${e.key}`);
      } else navigate(`?typeWill=${e.key}`);
    }
  };

  const itemMobile = () => {
    return (
      <>
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
        >
          <MenuIcon />
        </IconButton>
        <Drawer
          title={<WillImage src={logo} />}
          onClose={() => {
            setOpen(false);
          }}
          closable={false}
          width={315}
          extra={
            <Space>
              <IconButton
                onClick={() => {
                  setOpen(false);
                }}
              >
                <CloseOutlined />
              </IconButton>
            </Space>
          }
          open={open}
        >
          {accessToken && (
            <Menu
              mode="vertical"
              onClick={handleChange}
              theme="light"
              activeKey={activeKey}
              items={items}
            />
          )}
          <Row style={{ position: "absolute", bottom: 24 }}>
            <Col span={24}>
              <ConnectButton clickLogin={handelOpenModalLogin} />
            </Col>
          </Row>
        </Drawer>
      </>
    );
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
      {isTablet ? itemMobile() : itemDesktop()}

      <LoginModal
        loading={loadingLogin}
        clickOptionLogin={handelClickOptionLogin}
        open={isOpen}
        handleCancel={() => {
          setIsOpen(false);
        }}
      />
    </Flex>
  );
};
