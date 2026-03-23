import type { Question, Answer } from '@src/types';

export interface AuditFormProps {
  questions: Question[];
  savedAnswers: Record<string, Answer>;
  onSaveAnswer: (questionId: string, text: string) => void;
  onFinish: () => void;
}
