import React from 'react';
import { FormattedMessage } from 'react-intl';

import { QUESTIONS } from '@src/data';
import { FileUploadZone, ReportItem } from './components';
import { useAdminDashboard } from './hooks';
import messages from './messages';

export const AdminDashboard: React.FC = () => {
  const { parsedData, error, isDragging, setIsDragging, fileInputRef, handleFileChange, handleDrop, clearData } =
    useAdminDashboard();

  return (
    <div className="w-full max-w-5xl mx-auto p-4 md:p-8">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">
          <FormattedMessage {...messages.title} />
        </h2>
        <p className="text-gray-500 mt-2">
          <FormattedMessage {...messages.subtitle} />
        </p>
      </div>

      {!parsedData ? (
        <FileUploadZone
          onFileChange={handleFileChange}
          onDrop={handleDrop}
          isDragging={isDragging}
          setIsDragging={setIsDragging}
          fileInputRef={fileInputRef}
          error={error}
        />
      ) : (
        <div className="space-y-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-700">
              <FormattedMessage {...messages.reportTitle} />
            </h3>
            <button
              onClick={clearData}
              className="text-sm text-red-600 hover:text-red-800 hover:underline transition-colors"
            >
              <FormattedMessage {...messages.clearBtn} />
            </button>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
            <div className="divide-y divide-gray-200">
              {QUESTIONS.map((q) => (
                <ReportItem key={q.id} question={q} answer={parsedData[q.id]} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
