import "./styles.scss";
import { RightOutlined } from "@ant-design/icons";
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
import { AppButton } from "@/components/atoms/button";
import useDisclosure from "@/hooks/useDisclosure";
import clsx from "clsx";

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
  const a = false;
  const handleClickLogin = async () => {
    clickLogin();
  };

  return (
    <>
      {accessToken ? (
        <div className="connected-btn">
          <AppButton type="connect-btn" onClick={onToggle}>
            {displayedAddress}
          </AppButton>
          <div className={clsx("user-balance", { visible: isOpen })}>
            {balance}
          </div>
        </div>
      ) : (
        <AppButton
          type="primary"
          onClick={handleClickLogin}
          rightIcon={<RightOutlined />}
        >
          Login
        </AppButton>
      )}
    </>
  );
};
