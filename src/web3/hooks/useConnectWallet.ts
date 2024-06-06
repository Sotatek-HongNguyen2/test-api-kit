/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable indent */
import { Web3Provider } from '@ethersproject/providers';

import useWindowSize from 'src/hooks/useWindowSize';
import { ConnectorKey, connectors } from 'src/web3/connectors';

import { SUPPORTED_NETWORKS } from '../constants/networks';
import { signMessage } from '../helpers';
/**
 * Hook for connect/disconnect to a wallet
 * @returns `connectWallet` and `disconnectWallet` functions .
 */
export const useConnectWallet = () => {
  const { isMobile } = useWindowSize();

  const getAccountConnected = async (provider: Web3Provider) => {
    const signer = provider.getSigner();
    const account = await signer?.getAddress();
    return account;
  };

  const getSignature = async (provider: Web3Provider) => {
    const message = `${window?.env?.VITE_METAMASK_SECRET_KEY}`;
    const signer = provider?.getSigner();
    const signature = await signMessage(signer, message);
    return {
      message,
      signature
    };
  };

  async function connectWallet(connectorKey: ConnectorKey) {
    const connector = connectors[connectorKey];
    const chainId = parseInt(window?.env?.VITE_CHAIN_ID as string, 10) as keyof typeof SUPPORTED_NETWORKS;

    // if (appConnector?.walletConnectProvider?.wc?.uri) {
    //   alert('Stoppppp!!!');
    //   return;
    // }

    try {
      const objAddNetWork =
        connectorKey === ConnectorKey.metaMask
          ? ({
            chainId: chainId,
            chainName: SUPPORTED_NETWORKS()[chainId].chainName,
            nativeCurrency: {
              name: 'BNB',
              symbol: 'bnb',
              decimals: 18
            },
            rpcUrls: [window?.env?.VITE_RPC_URL],
            blockExplorerUrls: SUPPORTED_NETWORKS()[chainId].blockExplorerUrls
          } as any)
          : chainId;
      await connector.activate(objAddNetWork);
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  // const clearWalletConnect = () => {};

  const connectWalletAndSignMessage = async (connectorKey: ConnectorKey) => {
    const isMetamaskInstalled = window?.ethereum?.isMetaMask;
    if (!isMetamaskInstalled && connectorKey === ConnectorKey.metaMask) {
      const metamaskAppDeepLink = `https://metamask.app.link/dapp/${window.location.host}${window.location.pathname}`;
      if (isMobile) {
        window.location.assign(metamaskAppDeepLink);
      } else {
        window.open(metamaskAppDeepLink);
      }
      throw new Error('No provider found');
    }

    await connectWallet(connectorKey);
    const connector = connectors[connectorKey];
    if (!connector.provider) {
      throw new Error('No provider found');
    }
    const provider = new Web3Provider(connector?.provider);
    const account = await getAccountConnected(provider);
    if (!account) {
      throw new Error('Account not found');
    }
    const { message, signature } = await getSignature(provider);
    return {
      message,
      signature,
      account
    };
  };

  // function disconnectWallet() {}

  return { connectWallet, connectWalletAndSignMessage };
};
