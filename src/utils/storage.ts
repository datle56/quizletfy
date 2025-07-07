import { QuizSet } from '../types';

const STORAGE_KEY = 'quizlify_data';

export const loadQuizSets = (): QuizSet[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Error loading quiz sets:', error);
  }
  
  // Return default data if nothing in localStorage
  return [];
};

export const saveQuizSets = (quizSets: QuizSet[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(quizSets));
  } catch (error) {
    console.error('Error saving quiz sets:', error);
  }
};

export const generateId = (): string => {
  return Date.now().toString() + Math.random().toString(36).substr(2, 9);
};

export const getCurrentUserId = (): string => {
  // Simple user simulation - in real app this would come from auth
  let userId = localStorage.getItem('current_user_id');
  if (!userId) {
    userId = 'user_' + generateId();
    localStorage.setItem('current_user_id', userId);
  }
  return userId;
};