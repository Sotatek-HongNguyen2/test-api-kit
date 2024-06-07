import { WrapperContainer } from "../../components/organisms/wrapperContainer";

import NETWORKS from "@/models/network";
import WALLETS from "@/models/wallet";
import { AuthServices } from "@/services/auth-service";
import { getWalletSlice, useAppDispatch, useAppSelector } from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { Button } from "antd";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { isConnected, walletKey, address } = useAppSelector(getWalletSlice);
  console.log({ isConnected, walletKey, address });
  const authService = new AuthServices();

  const { connectWallet, signMessage } = walletSliceActions;
  const handleClickTest = async () => {
    await dispatch(
      connectWallet({
        wallet: WALLETS.metamask,
        network: NETWORKS.ethereum,
      })
    );
    console.log({ isConnected, walletKey, address });
  };
  const handleSignMessage = async () => {
    const res = await dispatch(
      signMessage({
        wallet: WALLETS.metamask,
        address: address,
      })
    );
    if (address && res) {
      const res2 = await authService.login({
        walletAddress: address,
        signature: `${res.payload}`,
      });
    }
  };

  return (
    <>
      <WrapperContainer title="Dashboard"></WrapperContainer>
      <Button type="primary" onClick={handleClickTest}>
        Test Connect Wallet
      </Button>
      <Button type="primary" onClick={handleSignMessage}>
        sign Wallet
      </Button>
    </>
  );
}
