import { useState } from "react";
// import { useWeb3React } from "@web3-react/core";
import { Web3Provider } from "@ethersproject/providers";

import { AuthServices } from "@/services/auth-service";
import { useAppDispatch } from "@/store";
import { authInstanceSlideActions } from "@/store/slices/authSlides";
import { walletSliceActions } from "@/store/slices/walletSlice";
import { ConnectorKey, connectors } from "@/connectors";
import { ETH_CHAIN_ID } from "@/const/envs";
import { NETWORK_NAME } from "@/models/network";
import { WALLET_NAME } from "@/models/wallet";
import { useNavigate } from "react-router-dom";
import { APP_ROUTES_PATHS } from "@/constants";
import WillToast from "@/components/atoms/ToastMessage";

const useLogin = () => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const authService = new AuthServices();

  async function walletConnect(connectorKey: ConnectorKey) {
    const connector = connectors[connectorKey];
    try {
      const objAddNetWork = Number(ETH_CHAIN_ID);
      await connector.activate(objAddNetWork);

      const res = await handleSignMessage(connectorKey);
      return res;
    } catch (error: any) {
      WillToast.error(error.message);
      throw new Error(error.message);
    }
  }

  const handleSignMessage = async (walletType: ConnectorKey) => {
    try {
      const connector = connectors[walletType];
      if (connector?.provider) {
        const signer = new Web3Provider(connector?.provider).getSigner();
        const accountSigner = await signer.getAddress();
        dispatch(
          walletSliceActions.updateAccountConnectApp({
            address: accountSigner,
            networkName: NETWORK_NAME.ETHEREUM,
            walletKey: WALLET_NAME.METAMASK,
          })
        );
        const signature = await signer.signMessage(
          import.meta.env.VITE_AUTH_MESSAGE_SIGN
        );
        const response = await login({ payload: signature });
        return response;
      }
    } catch (error: any) {
      if (error.code === "ACTION_REJECTED") {
        throw new Error("User denied message signature");
      } else {
        throw new Error(error.message);
      }
    }
  };

  const login = async (resSignMessage: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const loginResults = await authService.login({
        signature: `${resSignMessage.payload}`,
      });
      if (
        loginResults.data.status === 201 ||
        loginResults.data.status === 200
      ) {
        dispatch(
          authInstanceSlideActions.updateAccessToken(
            loginResults.data.data.accessToken
          )
        );
        dispatch(
          authInstanceSlideActions.updateRefreshToken(
            loginResults.data.data.refreshToken
          )
        );
      }
      navigate(APP_ROUTES_PATHS.HOME);

      return loginResults;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, walletConnect, isLoading, error };
};
const useLogout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const authService = new AuthServices();
  const logout = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const logoutResults = await authService.logout();
      if (
        logoutResults.data.status === 201 ||
        logoutResults.data.status === 200
      ) {
        dispatch(authInstanceSlideActions.deleteAuth());
        // WillToast.success("Logout success");
      }
      return logoutResults;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };
  return { logout, isLoading, error };
};

export { useLogin, useLogout };
