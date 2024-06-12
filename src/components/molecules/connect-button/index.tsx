import "./styles.scss";
import NETWORKS from "@/models/network";
import WALLETS from "@/models/wallet";
import {
  getAuthSlide,
  getWalletInstanceSlice,
  getWalletSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { useMemo } from "react";
import { AppButton, IconButton } from "@/components/atoms/button";
import useDisclosure from "@/hooks/useDisclosure";
import clsx from "clsx";
import { WalletIcon } from "@/assets/icons/custom-icon";
import { Flex } from "antd";
import { UserIcon } from "@/assets/icons/custom-icon/user-icon";

interface IPropsConnectButton {
  clickLogin: () => void;
}

export const ConnectButton = ({ clickLogin }: IPropsConnectButton) => {
  const { isConnected, walletKey, address } = useAppSelector(getWalletSlice);
  const { accessToken } = useAppSelector(getAuthSlide);
  const { balance } = useAppSelector(getWalletInstanceSlice);

  const displayedAddress = useMemo(
    () =>
      `${address?.substring(0, 10)}...${address?.substring(
        address?.length - 4,
        address?.length - 1
      )}`,
    [address]
  );
  const { isOpen, onToggle } = useDisclosure();

  const handleClickLogin = async () => {
    clickLogin();
  };

  return (
    <>
      {accessToken ? (
        <div className="connected-btn">
          <Flex align="center" gap={10}>
            <IconButton type="primary-outlined">
              <UserIcon />
            </IconButton>
            <AppButton type="primary-outlined" icon={<WalletIcon />} onClick={onToggle}>
              {displayedAddress}
            </AppButton>
          </Flex>
          <div className={clsx("user-balance", { visible: isOpen })}>
            {balance ?? 0}
          </div>
        </div>
      ) : (
        <AppButton
          type="primary"
          onClick={handleClickLogin}
        >
          Login
        </AppButton>
      )}
    </>
  );
};
