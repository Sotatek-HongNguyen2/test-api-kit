import { WillTabs } from "@/components/organisms/wil-tabs";
import { WrapperContainer } from "@/components/organisms/wrapper-container";
import { AuthServices } from "@/services/auth-service";
import WALLETS from "@/models/wallet";
import {
  getWalletInstanceSlice,
  getWalletSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { AppButton } from "@/components/atoms/button";
import { RightOutlined } from "@ant-design/icons";

export function HomePage() {
  const dispatch = useAppDispatch();
  const { isConnected, walletKey, address } = useAppSelector(getWalletSlice);
  console.log({ isConnected, walletKey, address });
  const { signMessage, getBalance } = walletSliceActions;
  const authService = new AuthServices();
  const { networkInstance } = useAppSelector(getWalletInstanceSlice);

  const handleSignMessage = async () => {
    console.log(networkInstance);

    if (address && networkInstance) {
      // const res = await dispatch(
      //   signMessage({
      //     wallet: WALLETS.metamask,
      //     address: address,
      //   })
      // );
      const ressss = await dispatch(
        getBalance({
          wallet: WALLETS.metamask,
          address: address,
          decimals: networkInstance?.nativeCurrency.decimals,
        })
      );
      // const res2 = await authService.login({
      //   walletAddress: address,
      //   signature: `${res.payload}`,
      // });
    }
  };
  return (
    <WrapperContainer title="Dashboard">
      <WillTabs />
      <AppButton
        type="primary"
        onClick={handleSignMessage}
        rightIcon={<RightOutlined />}
        style={{ width: "10vw" }}
      >
        Sign message
      </AppButton>
    </WrapperContainer>
  );
}
