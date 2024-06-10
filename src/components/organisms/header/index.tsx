import { Flex } from "antd";
import "./styles.scss";
import { FAQIcon } from "@/components/atoms/icons";
import { AppButton, IconButton } from "@/components/atoms/button";
import { ConnectButton } from "@/components/molecules";
import LoginModal from "../LoginModal";
import { useState } from "react";
import {
  getWalletInstanceSlice,
  getWalletSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { DECIMALS, KEY_OPTION_LOIN } from "@/constants";
import WALLETS from "@/models/wallet";
import NETWORKS from "@/models/network";
import { defaultAvatar } from "@/assets/images";
import useLogin from "@/hooks/useAuth";

export const Header = () => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { isConnected, walletKey, address } = useAppSelector(getWalletSlice);
  const { signMessage, getBalance, connectWallet } = walletSliceActions;
  const { networkInstance } = useAppSelector(getWalletInstanceSlice);
  const { login, isLoading, error } = useLogin();

  const handelOpenModalLogin = async () => {
    setIsOpen(true);
  };

  const handelClickOptionLogin = (key: string) => {
    switch (key) {
      case KEY_OPTION_LOIN.metaMask:
        connectToMetamask();
        break;
      case KEY_OPTION_LOIN.walletConnect:
        console.log("object");
        break;
    }
  };

  const connectToMetamask = async () => {
    if (!isConnected) {
      const connectResult = await dispatch(
        connectWallet({
          wallet: WALLETS.metamask,
          network: NETWORKS.ethereum,
        })
      );
      if (connectResult.payload) {
        await signIn(connectResult.payload as string);
      }
    } else {
      await signIn();
    }
  };

  const signIn = async (dto?: string) => {
    const strAddress = dto ? dto : address;
    if (strAddress) {
      const resSignMessage = await dispatch(
        signMessage({
          wallet: WALLETS.metamask,
          address: strAddress,
        })
      );
      const resGetBalance = await dispatch(
        getBalance({
          wallet: WALLETS.metamask,
          address: strAddress,
          decimals: DECIMALS.ETH,
        })
      );
      const loginResults = await login(resSignMessage);
      if (
        loginResults.data.status === 201 ||
        loginResults.data.status === 200
      ) {
        setIsOpen(false);
      }
    }
  };

  return (
    <Flex id="app-header" justify="flex-end" align="center" gap={10}>
      <IconButton>
        <FAQIcon />
      </IconButton>
      <span className="loader"></span>
      <ConnectButton clickLogin={handelOpenModalLogin} />
      <AppButton className="none-styles">
        <img src={defaultAvatar} />
      </AppButton>
      <LoginModal
        clickOptionLogin={handelClickOptionLogin}
        open={isOpen}
        handleCancel={() => {
          setIsOpen(false);
        }}
      />
    </Flex>
  );
};
