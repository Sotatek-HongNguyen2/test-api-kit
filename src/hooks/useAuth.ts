import { useState } from "react";

import { AuthServices } from "@/services/auth-service";
import { useAppDispatch } from "@/store";
import { authInstanceSlideActions } from "@/store/slices/authSlides";
import { ConnectorKey, connectors } from "@/connectors";
import { ETH_CHAIN_ID } from "@/constants/envs";

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const authService = new AuthServices();
  async function walletConnect(connectorKey: ConnectorKey) {
    const connector = connectors[connectorKey];
    try {
      const objAddNetWork = Number(ETH_CHAIN_ID);
      await connector.activate(objAddNetWork);
    } catch (error: any) {
      console.log(error);
      throw new Error(error.message);
    }
  }

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
