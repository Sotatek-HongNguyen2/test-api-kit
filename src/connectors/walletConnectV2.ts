import { initializeConnector } from "@web3-react/core";
import { WalletConnect as WalletConnectV2 } from "@web3-react/walletconnect-v2";

import { ETH_CHAIN_ID, ETH_RPC_URL } from "@/const/envs";

import { CHAINS } from "./chain";

const [mainnet] = Object.keys(CHAINS).map(Number);

export const [walletConnect, walletConnectHooks] =
  initializeConnector<WalletConnectV2>(
    (actions) =>
      new WalletConnectV2({
        actions,
        options: {
          projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID as string,
          chains: [mainnet],
          showQrModal: true,
          // methods: ['personal_sign', 'eth_requestAccounts', 'eth_sign'],

          rpcMap: {
            [ETH_CHAIN_ID]: ETH_RPC_URL,
          },
          qrModalOptions: {},
          metadata: {
            name: "Computing-Will",
            description: "Computing Will",
            url: "https://computing-will.sotatek.works/",
            icons: ["https://mydapp.com/icon.png"],
          },
          events: ["accountsChanged", "chainChanged"],
        },
      })
  );
