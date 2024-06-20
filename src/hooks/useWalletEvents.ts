import { useEffect } from "react";

import { WALLET_EVENT_NAME } from "@/models/wallet/wallet.abstract";
import {
  getAuthSlide,
  getWalletInstanceSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
// import WALLETS from "@/models/wallet";
// import { DECIMALS } from "@/constants";
import { useLogout } from "./useAuth";
import { EVM_CHAINS_METADATA } from "@/models/network/network";
// import { walletInstanceSliceActions } from "@/store/slices/walletInstanceSlice";

export default function useWalletEvents() {
  const { walletInstance } = useAppSelector(getWalletInstanceSlice);
  // const { getBalance } = walletSliceActions;
  const { logout } = useLogout();

  const dispatch = useAppDispatch();
  const { accessToken } = useAppSelector(getAuthSlide);

  // native event
  useEffect(() => {
    if (!walletInstance) return;
    // remove interval listener when wallet or network change

    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.ACCOUNTS_CHANGED,
      async handler() {
        await logout();
        return;
        // if (accounts && accounts.length > 0) {
        //   const resGetBalance = await dispatch(
        //     getBalance({
        //       wallet: WALLETS.metamask,
        //       address: accounts[0],
        //       decimals: DECIMALS.ETH,
        //     })
        //   );

        //   await dispatch(
        //     walletSliceActions.updateBalance(resGetBalance.payload as string)
        //   );
        //   return dispatch(walletSliceActions.updateAccount(accounts[0]));
        // }
        // return dispatch(walletSliceActions.disconnect());
      },
    });
    // display banner when listener was not initialize
    // initialize network chain listener

    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.CHAIN_CHANGED,
      handler(chain) {
        const isMatch =
          chain !== EVM_CHAINS_METADATA.mainnet.hexChainId &&
          chain !== EVM_CHAINS_METADATA.sepolia.hexChainId &&
          accessToken;
        if (isMatch) return logout();
        console.log("test", chain);
        return;
      },
    });
    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.DISCONNECT,
      handler(error) {
        console.log("🚀 ~ handler ~ error:", error);
        return logout();
      },
    });
    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.MESSAGE,
      handler(message) {
        console.log("🚀 ~ handler ~ error:", message);
      },
    });
    return () => {
      walletInstance.removeListener(WALLET_EVENT_NAME.ACCOUNTS_CHANGED);
      walletInstance.removeListener(WALLET_EVENT_NAME.CHAIN_CHANGED);
      walletInstance.removeListener(WALLET_EVENT_NAME.DISCONNECT);
      walletInstance.removeListener(WALLET_EVENT_NAME.MESSAGE);
    };
  }, [walletInstance]);
}
