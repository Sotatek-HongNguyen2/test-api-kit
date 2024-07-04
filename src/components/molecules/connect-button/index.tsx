import "./styles.scss";
import { useEffect, useMemo, useState } from "react";
import { Avatar, Dropdown, Flex, MenuProps } from "antd";
import { useNavigate } from "react-router-dom";

import {
  getAuthSlide,
  getBalanceSlide,
  getInformationInstanceSlide,
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
import formatNumber from "@/helpers/useFormatToken";
import { useDevices } from "@/hooks/useMediaQuery";
import { assetDataList } from "@/constants/asset";
import { BaseAsset } from "@/types";

interface IPropsConnectButton {
  clickLogin: () => void;
}

export const ConnectButton = ({ clickLogin }: IPropsConnectButton) => {
  const { address, walletKey } = useAppSelector(getWalletSlice);
  const { accessToken } = useAppSelector(getAuthSlide);
  const { listBalances } = useAppSelector(getBalanceSlide);
  const { isTablet } = useDevices();

  const { avatar } = useAppSelector(getInformationInstanceSlide);

  const [previewImage, setPreviewImage] = useState<string | null>(null);

  // const { balance } = useAppSelector(getWalletSlice);
  const { logout } = useLogout();
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const displayedAddress = useMemo(
    () =>
      `${address?.substring(0, 10)}...${address?.substring(
        address?.length - 3,
        address?.length
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

  const getLogoNetwork = (asset: BaseAsset) => {
    const labelAsset = assetDataList.find(
      (item) => item?.symbol === asset?.symbol
    );
    if (!labelAsset) {
      return <LogoETH />;
    }
    return labelAsset?.icon;
  };

  const items = useMemo(() => {
    const arr: MenuProps["items"] = [
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
    ];

    listBalances.forEach((item, index) => {
      arr.push({
        key: `${index + 2}`,
        label: (
          <div className="item-menu space-between">
            <span className="d-flex align-center g-8">
              {getLogoNetwork(item)}
              <span>{item.name}</span>
              <span className="symbol">{item.symbol}</span>
            </span>
            <span>{formatNumber(item.balance)}</span>
          </div>
        ),
      });
    });

    return arr;
  }, [listBalances]) as MenuProps["items"];
  useEffect(() => {
    setPreviewImage(avatar);
  }, [avatar]);

  return (
    <>
      {accessToken ? (
        <div className="connected-btn">
          <Flex align={!isTablet ? "center" : ""} vertical={isTablet} gap={10}>
            {!isTablet && (
              <>
                {previewImage ? (
                  <Avatar
                    style={{ cursor: "pointer" }}
                    src={previewImage}
                    size={36}
                    onClick={() => navigate(APP_ROUTES_PATHS.USER_PROFILE)}
                  />
                ) : (
                  <IconButton
                    type="primary-outlined"
                    onClick={() => navigate(APP_ROUTES_PATHS.USER_PROFILE)}
                  >
                    <UserIcon />
                  </IconButton>
                )}
              </>
            )}
            {!isTablet ? (
              <Dropdown menu={{ items }} placement="bottomRight">
                <AppButton type="primary-outlined" icon={<WalletIcon />}>
                  {displayedAddress}
                </AppButton>
              </Dropdown>
            ) : (
              <>
                <AppButton type="primary-outlined" icon={<WalletIcon />}>
                  {displayedAddress}
                </AppButton>
                <div className="item-menu mt-3" onClick={handleLogout}>
                  <Logout />
                  <span>Disconnect</span>
                </div>
              </>
            )}
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
