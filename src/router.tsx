import { createBrowserRouter } from 'react-router-dom';

import ProtectedRoute from './protected-route';
import PublicRoute from './public-route';

import { MainLayout } from './layout';

import { Login, Register, ForgotPassword } from './pages/auth';
import { Home } from './pages/home';
import { NewTransaction } from './pages/new-transaction';
import { Wallet } from './pages/wallet';
import { ResetPassword } from './pages/auth/reset-password/page';

export const router = createBrowserRouter([
  {
    element: <ProtectedRoute />,
    children: [
      {
        element: <MainLayout />,
        children: [
          {
            path: '/',
            element: <Home />,
          },
          {
            path: '/wallet',
            element: <Wallet />,
          },
          {
            path: '/new',
            element: <NewTransaction />,
          },
        ],
      },
    ],
  },
  {
    element: <PublicRoute />,
    children: [
      {
        path: '/auth/login',
        element: <Login />,
      },
      {
        path: '/auth/register',
        element: <Register />,
      },
      {
        path: '/auth/forgot-password',
        element: <ForgotPassword />,
      },
      {
        path: '/auth/reset-password/:userId/:token',
        element: <ResetPassword />,
      },
    ],
  },
]);
