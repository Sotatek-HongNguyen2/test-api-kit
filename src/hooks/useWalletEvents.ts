import { useEffect, useMemo, useRef } from "react";

import {
  WALLET_EVENT_NAME,
  WALLET_NAME,
} from "@/models/wallet/wallet.abstract";
import {
  getWalletInstanceSlice,
  store,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { Wallet } from "@/models/wallet";
import { Network } from "@/models/network";

export default function useWalletEvents() {
  const { walletInstance } = useAppSelector(getWalletInstanceSlice);
  const dispatch = useAppDispatch();

  // native event
  useEffect(() => {
    if (!walletInstance) return;
    // remove interval listener when wallet or network change

    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.ACCOUNTS_CHANGED,
      handler(accounts) {
        if (accounts && accounts.length > 0) {
          return dispatch(walletSliceActions.updateAccount(accounts[0]));
        }
        return dispatch(walletSliceActions.disconnect());
      },
    });
    // display banner when listener was not initialize
    // initialize network chain listener

    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.CHAIN_CHANGED,
      handler(chain) {
        if (!chain) return dispatch(walletSliceActions.disconnect());
        console.log("test", chain);
        return;
      },
    });
    walletInstance.addListener({
      eventName: WALLET_EVENT_NAME.DISCONNECT,
      handler(error) {
        console.log("🚀 ~ handler ~ error:", error);
        return dispatch(walletSliceActions.disconnect());
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
