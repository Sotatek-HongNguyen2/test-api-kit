import { metaMask, metamaskHooks } from './metaMask';
import { walletConnect, walletConnectHooks } from './walletConnectV2';

export enum ConnectorKey {
  metamask = 'MetaMask',
  walletConnect = 'WalletConnect',
}

export const connectors = {
  [ConnectorKey.metamask]: metaMask,
  [ConnectorKey.walletConnect]: walletConnect,
};

export const hooks = {
  [ConnectorKey.metamask]: metamaskHooks,
  [ConnectorKey.walletConnect]: walletConnectHooks,
};
