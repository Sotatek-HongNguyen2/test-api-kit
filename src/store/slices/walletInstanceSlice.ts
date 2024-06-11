import NETWORKS, { Network, NETWORK_NAME } from "@/models/network";
import WALLETS, { Wallet, WALLET_NAME } from "@/models/wallet";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

// state type
export type WalletState = {
  walletInstance: Wallet | null;
  networkInstance: Network | null;
  balance: string | number | null | undefined;
};

export type initInstancePayload = {
  walletKey: WALLET_NAME;
  networkName: NETWORK_NAME;
};

// init state
const initialState: WalletState = {
  walletInstance: null,
  networkInstance: null,
  balance: null,
};

// slice create
export const WalletInstanceSlice = createSlice({
  name: "walletInstance",
  initialState,
  reducers: {
    changeNetwork(state, action: PayloadAction<NETWORK_NAME>) {
      state.networkInstance = NETWORKS[action.payload];
    },
    initializeInstance(state, action: PayloadAction<initInstancePayload>) {
      state.walletInstance = WALLETS[action.payload.walletKey];
      state.networkInstance = NETWORKS[action.payload.networkName];
    },
    setBalance(
      state,
      action: PayloadAction<string | number | null | undefined>
    ) {
      state.balance = action.payload;
    },
    removeInstances(state) {
      state.walletInstance = null;
      state.networkInstance = null;
    },
  },
});

// normal flow action
export const walletInstanceSliceActions = { ...WalletInstanceSlice.actions };

// export
export default WalletInstanceSlice.reducer;
