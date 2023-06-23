import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './store/auth';

const PublicRoute = () => {
  const { currentUser } = useAuth();
  if (currentUser) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;
