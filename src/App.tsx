import { useLayoutEffect, useState } from 'react';
import { RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { ThemeProvider } from './ThemeProvider';

import { checkAuth } from './apis/auth';
import { useAuth } from './store/auth';

import { router } from './router';

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
