
import "./styles.scss"
import { RightOutlined } from '@ant-design/icons';
import NETWORKS from "@/models/network";
import WALLETS from "@/models/wallet";
import { getWalletSlice, useAppDispatch, useAppSelector } from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { useMemo } from "react";
import { AppButton } from '@/components/atoms/button';
import useDisclosure from "@/hooks/useDisclosure";
import clsx from "clsx";

export const ConnectButton = () => {
  const dispatch = useAppDispatch();
  const { isConnected, walletKey, address } = useAppSelector(getWalletSlice);
  console.log({ isConnected, walletKey, address });
  const displayedAddress = useMemo(() => `${address?.substring(0, 10)}...${address?.substring(address?.length - 4, address?.length - 1)}`, [address]);
  const { connectWallet } = walletSliceActions;
  const { isOpen, onToggle } = useDisclosure();

  const handleClickTest = async () => {
    await dispatch(
      connectWallet({
        wallet: WALLETS.metamask,
        network: NETWORKS.ethereum,
      })
    );
  };

  return (
    <>
      {
        isConnected ? (
          <div className="connected-btn">
            <AppButton type="connect-btn" onClick={onToggle}>
              {displayedAddress}
            </AppButton>
            <div className={clsx("user-balance", { "visible": isOpen })}>
              0.00 ETH
            </div>
          </div>
        ) : (
          <AppButton type="primary" onClick={handleClickTest} rightIcon={<RightOutlined />}>
            Connect Wallet
          </AppButton>
        )
      }
    </>
  )
}