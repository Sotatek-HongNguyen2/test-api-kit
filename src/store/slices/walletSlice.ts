import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import NETWORKS, { Network, NETWORK_NAME } from "@/models/network";
import WALLETS, { Wallet, WALLET_NAME } from "@/models/wallet";
import { WALLET_EVENT_NAME } from "@/models/wallet/wallet.abstract";
import { DECIMALS } from "@/constants";

import { createAppThunk } from "..";
import { walletInstanceSliceActions } from "./walletInstanceSlice";

// state type
export type WalletStateConnected = {
  isConnected: true;
  address: string;
  walletKey: WALLET_NAME;
  networkName: NETWORK_NAME | null;
  balance: string | number;
};
export type WalletStateDisConnected = {
  address?: undefined;
  isConnected: false;
  walletKey: null;
  networkName: NETWORK_NAME | null;
  balance: string | number;
};
export type WalletState = WalletStateConnected | WalletStateDisConnected;

// payload type
export type connectWalletPayload = {
  wallet: Wallet;
  network: Network;

  onCnStart?: () => void;
  onCnFinish?: () => void;
  whileCnHandle?: () => void;
};

export type signMessagePayload = {
  wallet: Wallet;
  address: string;
};

export type getBalancePayload = {
  wallet: Wallet;
  address: string;
  decimals: number;
};

export type connectedPayload = Required<
  Omit<WalletStateConnected, "isConnected" | "asset">
>;

// init state
const initialState: WalletState = {
  isConnected: false,
  walletKey: null,
  networkName: null,
  balance: "0",
};

// thunk action
const connectWallet = createAppThunk<{
  message: string;
}>()(
  "wallet/connectWallet",
  async (
    {
      wallet,
      network,
    }: // onCnStart,
    // onCnFinish,
    // whileCnHandle,
    connectWalletPayload,
    { dispatch }
  ) => {
    const res = await wallet
      .connect
      // network,
      // onCnStart,
      // onCnFinish,
      // undefined,
      // whileCnHandle
      ();

    // store wallet and network key which contain serialize data that could use persist
    const balance = await dispatch(
      getBalance({
        wallet: WALLETS.metamask,
        address: res,
        decimals: DECIMALS.ETH,
      })
    );
    dispatch(
      walletSlicePrvActions.connected({
        walletKey: wallet.name,
        networkName: network.name,
        address: res,
        balance: `${balance.payload}`,
      })
    );

    // store wallet and network instance which contain non-serialize data that couldn't use persist
    dispatch(
      walletInstanceSliceActions.initializeInstance({
        walletKey: wallet.name,
        networkName: network.name,
      })
    );

    // store last network key
    return res;
  }
);

// sync instance data with persisted wallet and network key when reload, revisit site
const rehydrateNetworkInstance = createAppThunk()(
  "wallet/rehydrateNetworkInstance",
  async (_, { dispatch, getState }) => {
    const { networkName, isConnected } = getState().wallet;
    if (!isConnected || !networkName) return true;
    dispatch(walletInstanceSliceActions.changeNetwork(networkName));
    return true;
  }
);

// when update network, also store network key to related states
const changeNetwork = createAppThunk()(
  "wallet/thunk/changeNetwork",
  async (network: Network, { dispatch }) => {
    dispatch(walletSlicePrvActions.changeNetwork(network.name));
    dispatch(walletInstanceSliceActions.changeNetwork(network.name));
    return true;
  }
);

const disconnect = createAppThunk()(
  "wallet/disconnect",
  async (_, { dispatch, getState }) => {
    const { walletInstance } = getState().walletInstance;
    // remove all listener before disconnect
    walletInstance!.removeListener(WALLET_EVENT_NAME.ACCOUNTS_CHANGED);
    walletInstance!.removeListener(WALLET_EVENT_NAME.CHAIN_CHANGED);
    walletInstance!.removeListener(WALLET_EVENT_NAME.DISCONNECT);
    walletInstance!.removeListener(WALLET_EVENT_NAME.MESSAGE);
    dispatch(walletSlicePrvActions.disconnectWallet());
    dispatch(walletInstanceSliceActions.removeInstances());
    return true;
  }
);

const signMessage = createAppThunk<{
  message: string;
}>()("wallet/signMessage", async ({ wallet, address }: signMessagePayload) => {
  const res = await wallet.signMessage(address);

  return res;
});

const getBalance = createAppThunk<{
  message: string;
}>()(
  "wallet/getBalance",
  async ({ wallet, address, decimals }: getBalancePayload) => {
    const res = await wallet.getBalance(address, decimals);
    return res;
  }
);

const reconnectWallet = createAppThunk()(
  "wallet/reconnectWallet",
  async (_, { dispatch, getState }) => {
    const { walletKey, networkName } = getState().wallet;

    if (!walletKey || !networkName)
      throw new Error(
        "You haven't connected to any wallet or network just yet"
      );
    dispatch(
      walletInstanceSliceActions.initializeInstance({
        walletKey,
        networkName,
      })
    );
    const res = await dispatch(
      connectWallet({
        wallet: WALLETS[walletKey],
        network: NETWORKS[networkName],
      })
    );

    if (
      connectWallet.rejected.match(res) &&
      res.error.message === WALLETS[walletKey].errorList.WALLET_CONNECT_REJECTED
    ) {
      dispatch(disconnect());
      return false;
    }

    const swRes = await WALLETS[walletKey].switchNetwork(NETWORKS[networkName]);

    return swRes;
  }
);

// slice create
export const WalletSlice = createSlice({
  name: "wallet",
  initialState: initialState as WalletState,
  reducers: {
    updateAccount(state, action: PayloadAction<string>) {
      state.address = action.payload;
    },
    changeNetwork(state, action: PayloadAction<NETWORK_NAME>) {
      state.networkName = action.payload;
    },
    connected(state, action: PayloadAction<connectedPayload>) {
      state.isConnected = true;
      state.walletKey = action.payload.walletKey;
      state.networkName = action.payload.networkName;
      state.address = action.payload.address;
      state.balance = action.payload.balance;
    },
    disconnectWallet(state) {
      state.address = undefined;
      state.isConnected = false;
      state.walletKey = null;
      state.networkName = null;
    },
    updateBalance(state, action: PayloadAction<string>) {
      // console.log("object");
      state.balance = action.payload;
    },
  },
});

// normal flow action
const walletSlicePrvActions = WalletSlice.actions;
export const walletSliceActions = {
  updateAccount: walletSlicePrvActions.updateAccount,
  updateAccountConnectApp: walletSlicePrvActions.connected,
  logout: walletSlicePrvActions.disconnectWallet,
  updateBalance: walletSlicePrvActions.updateBalance,
  connectWallet,
  rehydrateNetworkInstance,
  changeNetwork,
  disconnect,
  reconnectWallet,
  signMessage,
  getBalance,
};

// export
export default WalletSlice.reducer;
