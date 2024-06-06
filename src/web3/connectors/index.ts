import { Web3ReactHooks } from '@web3-react/core';
import { MetaMask } from '@web3-react/metamask';

import { metaMask, metamaskHooks } from './metamask';

export enum ConnectorKey {
  metaMask = 'MetaMask',
  walletConnect = 'walletConnect',
}

export const connectors = {
  [ConnectorKey.metaMask]: metaMask,
};

export const appConnectors: [MetaMask, Web3ReactHooks][] = [
  [metaMask, metamaskHooks],
];
