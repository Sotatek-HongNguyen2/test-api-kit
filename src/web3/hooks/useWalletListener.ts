import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

export function useWalletListener() {
  const { connector, account } = useWeb3React();
  // const { disconnectWallet } = useConnectWallet();

  const handleLogout = () => {
    // disconnectWallet();
  };

  const handleChainChange = () => {
    // handle after
  };

  useEffect(() => {
    if (account && connector && connector.provider) {
      connector.provider?.on('chainChanged', handleChainChange);
      connector.provider?.on('accountsChanged', handleLogout);
    } else {
      connector.provider?.removeListener('chainChanged', handleChainChange);
      connector.provider?.removeListener('accountsChanged', handleLogout);
    }

    if (window) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).logout = handleLogout;
    }

    return () => {
      connector.provider?.removeListener('chainChanged', handleChainChange);
      connector.provider?.removeListener('accountsChanged', handleLogout);
    };
  }, [connector.provider, account]);
}
