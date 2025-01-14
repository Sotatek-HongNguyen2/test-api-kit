import { useEffect } from "react";

import { WALLET_EVENT_NAME } from "@/models/wallet/wallet.abstract";
import {
  getWalletInstanceSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
// import WALLETS from "@/models/wallet";
// import { DECIMALS } from "@/constants";
import { EVM_CHAINS_METADATA } from "@/models/network/network";
import { authInstanceSlideActions } from "@/store/slices/authSlides";
import { commonInstanceSlideActions } from "@/store/slices/common";
import WillToast from "@/components/atoms/ToastMessage";
// import { walletInstanceSliceActions } from "@/store/slices/walletInstanceSlice";

export default function useWalletEvents() {
  const { walletInstance } = useAppSelector(getWalletInstanceSlice);
  // const { getBalance } = walletSliceActions;

  const dispatch = useAppDispatch();

  // native event
  useEffect(() => {
    if (!walletInstance) return;
    // remove interval listener when wallet or network change

    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.ACCOUNTS_CHANGED,
      async handler() {
        dispatch(walletSliceActions.logout());
        dispatch(authInstanceSlideActions.deleteAuth());
        WillToast.success("Logout success");
        return;
      },
    });
    // display banner when listener was not initialize
    // initialize network chain listener

    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.CHAIN_CHANGED,
      handler(chain) {
        const isUnMatch =
          chain !== EVM_CHAINS_METADATA.mainnet.hexChainId &&
          chain !== EVM_CHAINS_METADATA.sepolia.hexChainId;
        if (isUnMatch) {
          dispatch(walletSliceActions.logout());
          dispatch(authInstanceSlideActions.deleteAuth());
          dispatch(commonInstanceSlideActions.updateIsMatchNetwork(!isUnMatch));
          dispatch(commonInstanceSlideActions.updateOpen(true));
          return;
        }

        return;
      },
    });
    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.DISCONNECT,
      handler(error) {
        console.log("🚀 ~ handler ~ error:", error);
        dispatch(authInstanceSlideActions.deleteAuth());
        dispatch(walletSliceActions.logout());

        return;
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
