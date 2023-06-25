import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  currentUser: CurrentUser | null;
  loginUser: (user: CurrentUser) => void;
  logoutUser: () => void;
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      currentUser: null,

      loginUser: (user) => set({ currentUser: user }),

      logoutUser: () => set({ currentUser: null }),
    }),
    {
      name: 'currentUser',
    }
  )
);
