import { useState } from "react";
import { useSelector } from "react-redux";

import { ConnectorKey } from "@/connectors";
import { DECIMALS, KEY_OPTION_LOIN } from "@/constants";
import WALLETS from "@/models/wallet";
import NETWORKS from "@/models/network";
import { useLogin } from "@/hooks/useAuth";
import { getWalletSlice, useAppDispatch } from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import WillToast from "@/components/atoms/ToastMessage";
import { walletInstanceSliceActions } from "@/store/slices/walletInstanceSlice";
import { EVM_CHAINS_METADATA } from "@/models/network/network";

export const useHandleLogin = () => {
  const [loadingLogin, setLoadingLogin] = useState(false);
  const dispatch = useAppDispatch();
  const { isConnected, address } = useSelector(getWalletSlice);
  const { signMessage, getBalance, connectWallet } = walletSliceActions;
  const { login, walletConnect } = useLogin();
  const [isOpen, setIsOpen] = useState(false);
  const [unSupportNotwork, setUnSupportNetwork] = useState<boolean>(false);

  const handelClickOptionLogin = (key: string) => {
    switch (key) {
      case KEY_OPTION_LOIN.metaMask:
        connectToMetamask();
        break;
      case KEY_OPTION_LOIN.walletConnect:
        setLoadingLogin(true);
        connect();
        break;
    }
  };

  const connect = async () => {
    try {
      const loginResults = await walletConnect(ConnectorKey.walletConnect);
      if (
        loginResults?.data.status === 201 ||
        loginResults?.data.status === 200
      ) {
        WillToast.success("Connect Wallet successfully");
        setLoadingLogin(false);
        setIsOpen(false);
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  const connectToMetamask = async () => {
    setLoadingLogin(true);

    if (!isConnected) {
      const connectResult = (await dispatch(
        connectWallet({
          wallet: WALLETS.metamask,
          network: NETWORKS.ethereum,
        })
      )) as any;
      if (connectResult.error) {
        setLoadingLogin(false);
        WillToast.error(connectResult?.error?.message);
        return;
      }

      if (connectResult.payload) {
        await signIn(connectResult.payload);
      }
    } else {
      await signIn();
    }
  };

  const signIn = async (dto?: any) => {
    try {
      const strAddress = dto ? dto : address;
      if (strAddress) {
        const netWorkID = await WALLETS.metamask.getNetwork();
        if (
          netWorkID !== EVM_CHAINS_METADATA.mainnet.hexChainId &&
          netWorkID !== EVM_CHAINS_METADATA.sepolia.hexChainId
        ) {
          setUnSupportNetwork(true);
          return;
        }
        const resSignMessage = (await dispatch(
          signMessage({
            wallet: WALLETS.metamask,
            address: strAddress,
          })
        )) as any;

        if (resSignMessage?.error) {
          setLoadingLogin(false);
          WillToast.error(resSignMessage.error.message);
          return;
        }
        const resGetBalance = await dispatch(
          getBalance({
            wallet: WALLETS.metamask,
            address: strAddress,
            decimals: DECIMALS.ETH,
          })
        );
        await dispatch(
          walletInstanceSliceActions.setBalance(`${resGetBalance.payload}`)
        );

        const loginResults = await login(resSignMessage);
        if (
          loginResults.data.status === 201 ||
          loginResults.data.status === 200
        ) {
          WillToast.success("Connect Wallet successfully");
          setLoadingLogin(false);
          setIsOpen(false);
        }
      }
    } finally {
      setLoadingLogin(false);
    }
  };

  return {
    handelClickOptionLogin,
    connect,
    connectToMetamask,
    signIn,
    isOpen,
    setIsOpen,
    loadingLogin,
    setLoadingLogin,
    unSupportNotwork,
    setUnSupportNetwork,
  };
};
