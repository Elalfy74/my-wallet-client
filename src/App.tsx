import { useLayoutEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './ThemeProvider';

import { checkAuth } from './apis/auth';
import { useAuth } from './store/auth';

import { MainLayout } from './layout';
import ProtectedRoute from './protected-route';
import PublicRoute from './public-route';

import { Login, Register } from './pages/auth';
import { Home } from './pages/home';
import { Wallet } from './pages/wallet';
import { NewTransaction } from './pages/new-transaction';

const router = createBrowserRouter([
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
    ],
  },
]);
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  const [isLoading, setLoading] = useState(true);
  const logoutUser = useAuth((state) => state.logoutUser);

  useLayoutEffect(() => {
    checkAuth()
      .catch(logoutUser)
      .then(() => setLoading(false));
  }, []);

  return (
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        {!isLoading && <RouterProvider router={router} />}
      </QueryClientProvider>
    </ThemeProvider>
  );
}
