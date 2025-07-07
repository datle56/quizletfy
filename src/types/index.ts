export interface Card {
  id: string;
  term: string;
  definition: string;
}

export interface QuizSet {
  id: string;
  title: string;
  description: string;
  termCount: number;
  creator: string;
  userId: string;
  createdAt: string;
  color: string;
  cards: Card[];
}

export type ViewMode = 'dashboard' | 'quizDetail' | 'flashcardStudy' | 'createSet';