import type { Question, Answer } from '@src/types';

export interface ReportItemProps {
  question: Question;
  answer?: Answer | undefined;
}
