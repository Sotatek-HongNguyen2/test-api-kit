import "./styles.scss";
import { useMemo } from "react";
import { Dropdown, Flex, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

import {
  getAuthSlide,
  getWalletSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { AppButton, IconButton } from "@/components/atoms/button";
// import useDisclosure from "@/hooks/useDisclosure";
import { WalletIcon } from "@/assets/icons/custom-icon";
import { UserIcon } from "@/assets/icons/custom-icon/user-icon";
import { LogoETH, Logout, Wallet } from "@/assets/icons";
import { ConnectorKey, connectors } from "@/connectors";
import { WALLET_NAME } from "@/models/wallet";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { useLogout } from "@/hooks/useAuth";
import { APP_ROUTES_PATHS } from "@/constants";
import useFormattedNumber from "@/hooks/useFormatToken";

interface IPropsConnectButton {
  clickLogin: () => void;
}

export const ConnectButton = ({ clickLogin }: IPropsConnectButton) => {
  const { address, walletKey } = useAppSelector(getWalletSlice);
  const { accessToken } = useAppSelector(getAuthSlide);
  const { balance } = useAppSelector(getWalletSlice);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const displayedAddress = useMemo(
    () =>
      `${address?.substring(0, 10)}...${address?.substring(
        address?.length - 4,
        address?.length - 1
      )}`,
    [address]
  );

  const handleClickLogin = async () => {
    clickLogin();
  };

  const handleLogout = async () => {
    if (walletKey === WALLET_NAME.WALLET_CONNECT) {
      const connector = connectors[ConnectorKey.walletConnect];
      connector.deactivate && (await connector.deactivate());
    }
    await logout();
    await dispatch(walletSliceActions.logout());
    localStorage.clear();
    navigate(APP_ROUTES_PATHS.NO_AUTH);
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <div className="item-menu" onClick={handleLogout}>
          <Logout />
          <span>Disconnect</span>
        </div>
      ),
    },
    {
      type: "divider",
    },
    {
      key: "2",
      label: (
        <div className="item-menu space-between">
          <span className="d-flex align-center g-8">
            <LogoETH />
            <span>Ethereum</span>
            <span className="symbol">ETH</span>
          </span>
          <span>{useFormattedNumber(Number(balance))}</span>
        </div>
      ),
    },
    {
      key: "3",
      label: (
        <div className="item-menu space-between">
          <span className="d-flex align-center g-8">
            <LogoETH />
            <span>Ethereum</span>
            <span className="symbol">ETH</span>
          </span>
          <span>{useFormattedNumber(Number(balance))}</span>
        </div>
      ),
    },
    {
      key: "4",
      label: (
        <div className="item-menu space-between">
          <span className="d-flex align-center g-8">
            <LogoETH />
            <span>Ethereum</span>
            <span className="symbol">ETH</span>
          </span>
          <span>{useFormattedNumber(Number(balance))}</span>
        </div>
      ),
    },
  ];

  return (
    <>
      {accessToken ? (
        <div className="connected-btn">
          <Flex align="center" gap={10}>
            <IconButton type="primary-outlined">
              <UserIcon />
            </IconButton>
            <Dropdown menu={{ items }} placement="bottomRight">
              <AppButton type="primary-outlined" icon={<WalletIcon />}>
                {displayedAddress}
              </AppButton>
            </Dropdown>
          </Flex>
        </div>
      ) : (
        <Flex align="center" gap={10}>
          {/* <IconButton type="primary-outlined">
            <UserIcon />
          </IconButton> */}
          <AppButton
            icon={<Wallet />}
            type="primary"
            onClick={handleClickLogin}
          >
            CONNECT WALLET
          </AppButton>
        </Flex>
      )}
    </>
  );
};
