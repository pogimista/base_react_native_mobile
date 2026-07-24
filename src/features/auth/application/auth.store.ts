import { create } from 'zustand';

import type { AuthSession } from '../domain/auth.types';

interface AuthState {
  session: AuthSession | undefined;
  setSession: (session: AuthSession | undefined) => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  session: undefined,
  setSession: (session) => set({ session }),
}));
