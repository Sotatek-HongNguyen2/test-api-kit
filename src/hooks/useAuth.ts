import { useState } from "react";
import { AuthServices } from "@/services/auth-service";
import { useAppDispatch } from "@/store";
import { authInstanceSlideActions } from "@/store/slices/authSlides";
import { WillToast } from "@/components/atoms/Toast";
// Adjust the import based on your project structure

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();
  const [error, setError] = useState(null);
  const authService = new AuthServices();
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
        WillToast.success("Login success");
      }
      return loginResults;
    } catch (err: any) {
      setError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error };
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
        WillToast.success("Logout success");
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
