import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { useAuthStore } from './authStore';

export interface User {
  username: string;
  email: string;
  avatar: string;
  joinDate: string;
  preferences: {
    darkMode: boolean;
    language: string;
    notifications: boolean;
    autoPlay: boolean;
    studyReminders: boolean;
  };
  achievements: Achievement[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  date: string;
  badge: string;
  unlocked: boolean;
}

export interface StudySession {
  id: string;
  setId: string;
  setTitle: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  mode: string;
  cards: {
    term: string;
    timeSpentSec: number;
    correct: boolean;
    attempts: number;
  }[];
}

export interface PerformanceStats {
  totalStudyTime: number;
  sessionsCount: number;
  correctRate: number;
  averageSessionTime: number;
  totalCardsStudied: number;
  weeklyProgress: number[];
  dailyStreak: number;
  longestStreak: number;
  monthlyStats: {
    [key: string]: {
      sessions: number;
      timeMinutes: number;
      accuracy: number;
    };
  };
}

interface UserState {
  user: User | null;
  studySessions: StudySession[];
  performanceStats: PerformanceStats | null;
  isLoading: boolean;
  initializeUser: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
  addStudySession: (session: StudySession) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      studySessions: [],
      performanceStats: null,
      isLoading: true,

      initializeUser: async () => {
        try {
          // Get user from auth store
          const authUser = useAuthStore.getState().user;
          
          if (authUser) {
            // Load user data from userData.json
            const response = await fetch('/src/data/userData.json');
            const userData = await response.json();
            
            set({
              user: {
                username: authUser.username,
                email: authUser.email || 'demo@quizlify.com',
                avatar: authUser.avatar,
                joinDate: authUser.joinDate,
                preferences: authUser.preferences,
                achievements: authUser.achievements
              },
              studySessions: userData.studySessions,
              performanceStats: userData.performanceStats,
              isLoading: false,
            });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          console.error('Failed to load user data:', error);
          set({ isLoading: false });
        }
      },

      updateUserPreferences: (preferences) => {
        const { user } = get();
        if (user) {
          set({
            user: {
              ...user,
              preferences: { ...user.preferences, ...preferences },
            },
          });
        }
      },

      addStudySession: (session) => {
        const { studySessions, performanceStats } = get();
        const newSessions = [...studySessions, session];
        
        // Update performance stats
        const totalTime = performanceStats?.totalStudyTime || 0;
        const totalSessions = performanceStats?.sessionsCount || 0;
        const totalCards = performanceStats?.totalCardsStudied || 0;
        
        const correctAnswers = session.cards.filter(card => card.correct).length;
        const totalAnswers = session.cards.length;
        const currentCorrectRate = performanceStats?.correctRate || 0;
        
        const newCorrectRate = ((currentCorrectRate * totalCards) + correctAnswers) / (totalCards + totalAnswers);
        
        set({
          studySessions: newSessions,
          performanceStats: {
            ...performanceStats!,
            totalStudyTime: totalTime + session.durationMinutes,
            sessionsCount: totalSessions + 1,
            correctRate: newCorrectRate,
            totalCardsStudied: totalCards + totalAnswers,
            averageSessionTime: (totalTime + session.durationMinutes) / (totalSessions + 1),
          },
        });
      },

      logout: () => {
        set({
          user: null,
          studySessions: [],
          performanceStats: null,
          isLoading: false,
        });
      },
    }),
    {
      name: 'user-storage',
    }
  )
);