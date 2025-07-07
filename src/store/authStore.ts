import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface LoginUser {
  id: string;
  email: string;
  username: string;
  avatar: string;
  joinDate: string;
  preferences: {
    darkMode: boolean;
    language: string;
    notifications: boolean;
    autoPlay: boolean;
    studyReminders: boolean;
  };
  achievements: Array<{
    id: string;
    title: string;
    description: string;
    date: string;
    badge: string;
    unlocked: boolean;
  }>;
}

interface AuthState {
  user: LoginUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  autoLogin: () => Promise<void>;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      isAuthenticated: false,
      isLoading: true,

      login: async (email: string, password: string) => {
        try {
          const response = await fetch('/src/data/loginData.json');
          const loginData = await response.json();
          
          const user = loginData.users.find((u: any) => 
            u.email === email && u.password === password
          );
          
          if (user) {
            set({
              user,
              isAuthenticated: true,
              isLoading: false
            });
            return true;
          }
          
          return false;
        } catch (error) {
          console.error('Login error:', error);
          return false;
        }
      },

      autoLogin: async () => {
        try {
          const response = await fetch('/src/data/loginData.json');
          const loginData = await response.json();
          
          if (loginData.autoLogin.enabled) {
            const user = loginData.users.find((u: any) => 
              u.id === loginData.autoLogin.defaultUserId
            );
            
            if (user) {
              set({
                user,
                isAuthenticated: true,
                isLoading: false
              });
              return;
            }
          }
          
          set({ isLoading: false });
        } catch (error) {
          console.error('Auto login error:', error);
          set({ isLoading: false });
        }
      },

      logout: () => {
        set({
          user: null,
          isAuthenticated: false,
          isLoading: false
        });
      }
    }),
    {
      name: 'auth-storage',
    }
  )
);