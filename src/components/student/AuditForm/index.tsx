import React, { useState, useEffect } from 'react';
import { FormattedMessage } from 'react-intl';

import { ProgressBar, Button } from '@ui';
import { usePagination } from '@src/hooks';
import { QuestionCard } from '../QuestionCard';
import { useAuditForm } from './hooks';
import type { AuditFormProps } from './types';
import messages from './messages';

export const AuditForm: React.FC<AuditFormProps> = ({ questions, savedAnswers, onSaveAnswer, onFinish }) => {
  const [unansweredIds, setUnansweredIds] = useState<string[]>([]);
  const { saveStatus, handleTextChange } = useAuditForm(onSaveAnswer);

  const { currentPage, totalPages, currentData, nextPage, prevPage, isFirstPage, isLastPage, goToPage } = usePagination(
    questions,
    10
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  const handleFinish = () => {
    const missing = questions.filter((q) => !savedAnswers[q.id]?.text.trim()).map((q) => q.id);

    if (missing.length > 0) {
      setUnansweredIds(missing);

      const firstMissingId = missing[0];
      if (firstMissingId) {
        const firstMissingIndex = questions.findIndex((q) => q.id === firstMissingId);
        if (firstMissingIndex !== -1) {
          const targetPage = Math.floor(firstMissingIndex / 10) + 1;
          if (currentPage !== targetPage) {
            goToPage(targetPage);
          }

          setTimeout(() => {
            document.getElementById(`question-card-${firstMissingId}`)?.scrollIntoView({
              behavior: 'smooth',
              block: 'center',
            });
          }, 100);
        }
      }
    } else {
      setUnansweredIds([]);
      onFinish();
    }
  };

  return (
    <div className="flex flex-col w-full max-w-4xl mx-auto p-4 md:p-8">
      {/* Header and Progress */}
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            <FormattedMessage {...messages.title} />
          </h2>
          <p className="text-sm text-gray-500">
            <FormattedMessage {...messages.page} values={{ current: currentPage, total: totalPages }} />
          </p>
        </div>
        <div className="flex items-center space-x-3 text-sm h-6">
          {saveStatus === 'saving' && (
            <span className="text-amber-500 animate-pulse">
              <FormattedMessage {...messages.saving} />
            </span>
          )}
          {saveStatus === 'saved' && (
            <span className="text-green-500 font-medium">
              <FormattedMessage {...messages.saved} />
            </span>
          )}
        </div>
      </div>

      <ProgressBar current={currentPage} total={totalPages} />

      {unansweredIds.length > 0 && (
        <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center shadow-sm">
          <svg className="w-5 h-5 mr-3 shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span className="font-medium">
            <FormattedMessage {...messages.unansweredError} values={{ count: unansweredIds.length }} />
          </span>
        </div>
      )}

      {/* Questions List */}
      <div className="space-y-6 grow">
        {currentData.map((q) => (
          <QuestionCard
            key={q.id}
            question={q}
            value={savedAnswers[q.id]?.text ?? ''}
            hasError={unansweredIds.includes(q.id)}
            onChange={(val) => {
              if (unansweredIds.includes(q.id) && val.trim().length > 0) {
                setUnansweredIds((prev) => prev.filter((id) => id !== q.id));
              }
              handleTextChange(q.id, val);
            }}
          />
        ))}
      </div>

      {/* Footer Navigation */}
      <div className="mt-8 pt-4 border-t border-gray-200 flex justify-between items-center">
        <Button onClick={prevPage} disabled={isFirstPage} variant="secondary">
          <FormattedMessage {...messages.btnPrev} />
        </Button>

        {!isLastPage ? (
          <Button onClick={nextPage} variant="primary">
            <FormattedMessage {...messages.btnNext} />
          </Button>
        ) : (
          <Button onClick={handleFinish} variant="success">
            <FormattedMessage {...messages.btnFinish} />
          </Button>
        )}
      </div>
    </div>
  );
};
