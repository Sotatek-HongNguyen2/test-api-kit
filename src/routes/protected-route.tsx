import { Navigate, Outlet, useLocation } from "react-router-dom";
import { getAuthSlide, getWalletSlice, store, useAppSelector } from "@/store";
import { APP_ROUTES_PATHS } from "@/constants";
import { useEffect, useState } from "react";

export function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();

  const { accessToken } = useAppSelector(getAuthSlide);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  useEffect(() => {
    setIsUserLoggedIn(!!accessToken);
  }, []);

  if (!isUserLoggedIn) {
    return (
      <Navigate state={{ from: location }} to={APP_ROUTES_PATHS.HOME} replace />
    );
  }

  return children ?? <Outlet />;
}
