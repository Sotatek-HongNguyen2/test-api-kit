import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { getWalletSlice, useAppSelector } from '@/store';
import { APP_ROUTES_PATHS } from '@/constants';

export function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();

  const { isConnected: isUserLoggedIn } = useAppSelector(getWalletSlice);

  if (!isUserLoggedIn) {
    return (
      <Navigate
        state={{ from: location }}
        to={APP_ROUTES_PATHS.HOME}
        replace
      />
    );
  }

  return children ?? <Outlet />;
}
