import { useEffect } from "react";

import { WALLET_NAME } from "@/models/wallet";
import {
  getWalletInstanceSlice,
  getWalletObjSlice,
  getWalletSlice,
  useAppDispatch,
  useAppSelector,
} from "@/store";
import { walletSliceActions } from "@/store/slices/walletSlice";

export default function useLoadWalletInstances() {
  const dispatch = useAppDispatch();
  const { metamask } = useAppSelector(getWalletObjSlice);
  const { walletKey } = useAppSelector(getWalletSlice);
  const { walletInstance } = useAppSelector(getWalletInstanceSlice);

  async function reconnectWallet() {
    const res = await dispatch(walletSliceActions.reconnectWallet());
  }

  async function rehydrateNetworkInstance() {
    await dispatch(walletSliceActions.rehydrateNetworkInstance());
  }

  useEffect(() => {
    rehydrateNetworkInstance();
  }, []);

  useEffect(() => {
    if (!walletKey || walletInstance) return;

    // check metamask wallet object is injected
    if (walletKey === WALLET_NAME.METAMASK && metamask.isInjected)
      reconnectWallet();
  }, [walletKey, metamask, walletInstance]);
}
