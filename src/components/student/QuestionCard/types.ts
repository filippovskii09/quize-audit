import type { Question } from '@src/types';

export interface QuestionCardProps {
  question: Question;
  value: string;
  onChange: (value: string) => void;
  hasError?: boolean;
}
