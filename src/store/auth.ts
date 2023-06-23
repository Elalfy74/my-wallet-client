import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  currentUser: CurrentUser | null;
  login: (user: CurrentUser) => void;
  logout: () => void;
  // checkAuth: () => Promise<void>;
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      currentUser: null,

      login: (user) => set({ currentUser: user }),

      logout: () => {},
    }),
    {
      name: 'currentUser',
    }
  )
);
