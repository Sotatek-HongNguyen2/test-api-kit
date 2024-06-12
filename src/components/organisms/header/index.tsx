import { Flex } from "antd";

import "./styles.scss";
import { useState } from "react";

import { ConfigIcon, FAQIcon } from "@/assets/icons/custom-icon";
import { IconButton } from "@/components/atoms/button";
import WillImage from "@/components/atoms/Image";
import logo from "@/assets/images/layout/logo.png";
import { ConnectButton } from "@/components/molecules";
import { getWalletSlice, useAppDispatch, useAppSelector } from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { DECIMALS, KEY_OPTION_LOIN } from "@/constants";
import WALLETS from "@/models/wallet";
import NETWORKS from "@/models/network";
import { useLogin } from "@/hooks/useAuth";
import { walletInstanceSliceActions } from "@/store/slices/walletInstanceSlice";
import WillToast from "@/components/atoms/ToastMessage";

import LoginModal from "../LoginModal";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { isConnected, address } = useAppSelector(getWalletSlice);
  const { signMessage, getBalance, connectWallet } = walletSliceActions;
  const { login } = useLogin();
  const [loadingLogin, setLoadingLogin] = useState<boolean>(false);

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
  };

  const handelClickOptionLogin = (key: string) => {
    switch (key) {
      case KEY_OPTION_LOIN.metaMask:
        connectToMetamask();
        break;
      case KEY_OPTION_LOIN.walletConnect:
        break;
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
        WillToast.error(connectResult.error.message);
        return;
      }

      if (connectResult.payload) {
        await signIn(connectResult.payload as string);
      }
    } else {
      await signIn();
    }
  };

  const signIn = async (dto?: string) => {
    try {
      const strAddress = dto ? dto : address;
      if (strAddress) {
        const resSignMessage = (await dispatch(
          signMessage({
            wallet: WALLETS.metamask,
            address: strAddress,
          })
        )) as any;
        if (resSignMessage.error) {
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
          setLoadingLogin(false);
          setIsOpen(false);
        }
      }
    } finally {
      setLoadingLogin(false);
    }
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
