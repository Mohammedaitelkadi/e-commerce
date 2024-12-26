import { create } from 'zustand';

interface User {
  id: string;
  email: string;
  name: string;
}

interface AuthStore {
  user: User | null;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signOut: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  signIn: async (email: string, password: string) => {
    // TODO: Implement actual authentication
    // For now, simulate a successful sign-in
    set({
      user: {
        id: '1',
        email,
        name: 'John Doe',
      },
    });
  },
  signUp: async (email: string, password: string, name: string) => {
    // TODO: Implement actual sign-up
    // For now, simulate a successful sign-up
    set({
      user: {
        id: '1',
        email,
        name,
      },
    });
  },
  signOut: () => {
    set({ user: null });
  },
}));