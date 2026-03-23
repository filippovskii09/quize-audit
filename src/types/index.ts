import { APP_MODE } from '@src/constants';

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

export type AppState =
  | { mode: typeof APP_MODE.IDLE }
  | { mode: typeof APP_MODE.STUDENT }
  | { mode: typeof APP_MODE.ADMIN };
