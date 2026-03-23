export interface Question {
  id: string;
  category: string;
  text: string;
}

export interface Answer {
  questionId: string;
  text: string;
  timestamp: number;
}

export type AppMode = 'idle' | 'student' | 'admin';

export type AppState = { mode: 'idle' } | { mode: 'student' } | { mode: 'admin' };
