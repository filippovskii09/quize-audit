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

export const AppMode = {
  IDLE: 'idle',
  STUDENT: 'student',
  ADMIN: 'admin',
} as const;

export type AppModeType = (typeof AppMode)[keyof typeof AppMode];

export type AppState =
  | { mode: typeof AppMode.IDLE }
  | { mode: typeof AppMode.STUDENT }
  | { mode: typeof AppMode.ADMIN };
