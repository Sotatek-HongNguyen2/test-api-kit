import React, { Fragment } from "react";

import "react-toastify/dist/ReactToastify.css";
import "./App.scss";
import { MetaMask } from "@web3-react/metamask";
import { Web3ReactHooks, Web3ReactProvider } from "@web3-react/core";
import { WalletConnect } from "@web3-react/walletconnect-v2";

import { AppRoutes } from "./routes/routes";
import "@/assets/scss/_themes.scss";
import "@/assets/scss/variable.scss";
import useWeb3Injected from "./hooks/useWeb3Injected";
import useLoadWalletInstances from "./hooks/useLoadWalletInstances";
import ToastContext from "./components/atoms/ToastContext";
import { metaMask, metamaskHooks } from "./connectors/metaMask";
import {
  walletConnect,
  walletConnectHooks,
} from "./connectors/walletConnectV2";

const App: React.FC = () => {
  useWeb3Injected();
  useLoadWalletInstances();

  const connectors: [MetaMask | WalletConnect, Web3ReactHooks][] = [
    [metaMask, metamaskHooks],
    [walletConnect, walletConnectHooks],
  ];

  return (
    <Web3ReactProvider connectors={connectors}>
      <Fragment>
        <ToastContext />
        <AppRoutes />
      </Fragment>
    </Web3ReactProvider>
  );
};

export default App;
