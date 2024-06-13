import { useMemo } from "react";

import { PROVIDER_TYPE, ProviderType } from "@/models/contract/evm/contract";
import { WALLET_INJECT_OBJ } from "@/models/wallet/wallet.abstract";
import { getWalletInstanceSlice, useAppSelector } from "@/store";
import erc20WhiteListContract from "@/models/contract/evm/erc20WhiteList";

type params = {
  ctrAddr?: string;
  provider?: ProviderType;
};

export default function useContractErc20WhiteList({
  ctrAddr,
  provider = {
    type: PROVIDER_TYPE.WALLET,
    injectObject: WALLET_INJECT_OBJ.METAMASK,
  },
}: params) {
  const { walletInstance } = useAppSelector(getWalletInstanceSlice);
  return useMemo(
    () =>
      !ctrAddr || !walletInstance
        ? null
        : new erc20WhiteListContract({
            address: ctrAddr,
            provider,
          }),
    [provider, ctrAddr, walletInstance]
  );
}
