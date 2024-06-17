import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { getAuthSlide, getWalletSlice, useAppSelector } from "@/store";
import { APP_ROUTES_PATHS } from "@/constants";
import { useLogout } from "@/hooks/useAuth";
import { WALLET_NAME } from "@/models/wallet";

export function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();
  const { accessToken } = useAppSelector(getAuthSlide);
  const { walletKey } = useAppSelector(getWalletSlice);
  const { logout } = useLogout();
  useEffect(() => {
    if (
      !window?.ethereum?.isMetaMask &&
      walletKey !== WALLET_NAME.WALLET_CONNECT &&
      accessToken
    ) {
      logout();
    }
  }, [window?.ethereum?.isMetaMask, walletKey]);

  if (walletKey !== WALLET_NAME.WALLET_CONNECT) {
    if (!accessToken || !window?.ethereum?.isMetaMask) {
      return (
        <Navigate
          state={{ from: location }}
          to={APP_ROUTES_PATHS.NO_AUTH}
          replace
        />
      );
    }
  }

  return children ?? <Outlet />;
}
