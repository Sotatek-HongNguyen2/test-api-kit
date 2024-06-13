import React from "react";
import ReactDOM from "react-dom/client";

import { store } from "./store";
import "./index.css";

import { Provider } from "react-redux";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { MetaMask } from "@web3-react/metamask";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import App from "./App";
import { metaMask, metamaskHooks } from "./connectors/metaMask";
import {
  walletConnect,
  walletConnectHooks,
} from "./connectors/walletConnectV2";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
  [metaMask, metamaskHooks],
  [walletConnect, walletConnectHooks],
];
root.render(
  <React.StrictMode>
    <Web3ReactProvider connectors={connectors}>
      <Provider store={store}>
        <App />
      </Provider>
    </Web3ReactProvider>
  </React.StrictMode>
);
