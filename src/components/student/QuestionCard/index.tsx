import React from 'react';
import { useIntl } from 'react-intl';

import { CategoryBadge } from '@ui';
import type { QuestionCardProps } from './types';
import messages from './messages';

export const QuestionCard: React.FC<QuestionCardProps> = ({ question, value, onChange, hasError = false }) => {
  const intl = useIntl();

  return (
    <div
      id={`question-card-${question.id}`}
      className={`bg-white p-6 rounded-lg shadow-sm border transition-colors ${hasError ? 'border-red-400' : 'border-gray-100'} flex flex-col`}
    >
      <div className="mb-2">
        <CategoryBadge category={question.category} />
      </div>
      <label htmlFor={`q-${question.id}`} className="block text-gray-800 font-medium mb-3 text-lg">
        {question.text}
      </label>
      <textarea
        id={`q-${question.id}`}
        className={`w-full border rounded-md p-3 min-h-30 focus:ring-2 outline-none transition-shadow resize-y ${
          hasError
            ? 'border-red-300 focus:ring-red-500 focus:border-red-500 bg-red-50'
            : 'border-gray-300 focus:ring-blue-500 focus:border-blue-500'
        }`}
        placeholder={intl.formatMessage(messages.placeholder)}
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
        }}
      />
      {hasError && <p className="mt-2 text-sm text-red-500 font-medium">{intl.formatMessage(messages.required)}</p>}
    </div>
  );
};
