// import { useWeb3React } from '@web3-react/core';
import { useEffect } from 'react';

/**
 * Trying eager connect to connectors at first time.
 * @returns `tried` tried eager connect done or not
 */
export function useEagerConnect() {
  // const { isActive } = useWeb3React();

  // const handleClearData = () => {
  // dispatch(clearAccessToken());
  // dispatch(clearWallet());
  // baseQueryApi.util.resetApiState();
  // };

  useEffect(() => {
    // if (!isActive) {
    //   if (wallet === ConnectorKey.walletConnect) {
    //     walletConnect
    //       .connectEagerly()
    //       .then(() => {
    //         if (accessToken) {
    //           dispatch(setIsAuth(true));
    //         }
    //       })
    //       .catch(() => {
    //         handleClearData();
    //       });
    //   } else if (wallet === ConnectorKey.metaMask) {
    //     (window.ethereum as any)?._metamask.isUnlocked().then((isUnlock: any) => {
    //       if (isUnlock) {
    //         getMe({})
    //           .unwrap()
    //           .then((res) => {
    //             if (
    //               String(res.address).toLocaleLowerCase() !== String(account).toLocaleLowerCase()
    //             ) {
    //               handleClearData();
    //               return;
    //             }
    //             metaMask.connectEagerly().then(() => {
    //               if (accessToken) {
    //                 dispatch(setIsAuth(true));
    //               }
    //             });
    //           })
    //           .catch(() => {
    //             handleClearData();
    //           });
    //       } else {
    //         handleClearData();
    //       }
    //     });
    //   }
    //   return;
    // }
    // Update `tried` only when isActive was `true`
    // dispatch(setIsAuthChecking(true));
  }, []);
}
