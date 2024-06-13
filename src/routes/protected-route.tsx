import { Navigate, Outlet, useLocation } from "react-router-dom";

import { getAuthSlide, useAppSelector } from "@/store";
import { APP_ROUTES_PATHS } from "@/constants";

export function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();

  const { accessToken } = useAppSelector(getAuthSlide);

  if (!accessToken) {
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
