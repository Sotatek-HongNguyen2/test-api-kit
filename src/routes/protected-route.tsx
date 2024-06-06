import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { APP_ROUTES_PATHS } from './navigation';
import { useAuthentication } from '../hooks/useAuthentication';

export function ProtectedRoute({ children }: { children?: JSX.Element }) {
  const location = useLocation();

  // const { isUserLoggedIn } = useAuthentication();
  const isUserLoggedIn = true;

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
