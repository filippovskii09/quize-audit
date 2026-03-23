import { useState, useRef } from 'react';

export const useAuditForm = (onSaveAnswer: (questionId: string, text: string) => void) => {
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved'>('idle');
  const timerRef = useRef<number | null>(null);

  const handleTextChange = (questionId: string, text: string) => {
    setSaveStatus('saving');
    onSaveAnswer(questionId, text);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = window.setTimeout(() => {
      setSaveStatus('saved');
      setTimeout(() => {
        if (timerRef.current !== null) {
          setSaveStatus('idle');
        }
      }, 2000);
    }, 500);
  };

  return { saveStatus, handleTextChange };
};
