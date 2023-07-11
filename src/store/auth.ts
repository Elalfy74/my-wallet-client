import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

interface AuthState {
  currentUser: CurrentUser | null;
  remember: boolean;
  loginUser: (user: CurrentUser, remember?: boolean) => void;
  logoutUser: () => void;
}

export const useAuth = create(
  persist<AuthState>(
    (set) => ({
      currentUser: null,
      remember: true,
      loginUser: (user, remember: boolean = true) => set({ currentUser: user, remember }),

      logoutUser: () => set({ currentUser: null, remember: undefined }),
    }),
    {
      name: 'currentUser',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
