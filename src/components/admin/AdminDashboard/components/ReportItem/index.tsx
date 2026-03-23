import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CategoryBadge } from '@ui';
import type { ReportItemProps } from './types';
import messages from './messages';

export const ReportItem: React.FC<ReportItemProps> = ({ question, answer }) => {
  return (
    <div className="p-6 hover:bg-gray-50 transition-colors">
      <div className="flex items-center space-x-2 mb-2">
        <CategoryBadge category={question.category} color="purple" />
        {answer && (
          <span className="text-xs text-gray-400">
            <FormattedMessage {...messages.answeredAt} values={{ date: new Date(answer.timestamp).toLocaleString() }} />
          </span>
        )}
      </div>
      <p className="text-gray-900 font-medium mb-3">{question.text}</p>
      <div className="bg-gray-50 p-4 rounded-md border border-gray-100">
        {answer?.text.trim() ? (
          <p className="text-gray-700 whitespace-pre-wrap">{answer.text}</p>
        ) : (
          <p className="text-gray-400 italic">
            <FormattedMessage {...messages.noAnswer} />
          </p>
        )}
      </div>
    </div>
  );
};
