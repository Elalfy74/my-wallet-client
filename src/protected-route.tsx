import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from './store/auth';

const ProtectedRoute = () => {
  const { currentUser } = useAuth();
  if (!currentUser) {
    return <Navigate to="/auth/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
