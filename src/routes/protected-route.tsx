import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { getAuthSlide, useAppSelector } from "@/store";
import { APP_ROUTES_PATHS } from "@/constants";
import { useLogout } from "@/hooks/useAuth";

export function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();
  const { accessToken } = useAppSelector(getAuthSlide);
  const { logout } = useLogout();
  useEffect(() => {
    if (!window?.ethereum?.isMetaMask && accessToken) {
      logout();
    }
  }, [window?.ethereum?.isMetaMask]);
  if (!accessToken || !window?.ethereum?.isMetaMask) {
    return (
      <Navigate
        state={{ from: location }}
        to={APP_ROUTES_PATHS.NO_AUTH}
        replace
      />
    );
  }

  return children ?? <Outlet />;
}
