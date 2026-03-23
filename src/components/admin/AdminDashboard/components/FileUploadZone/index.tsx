import React from 'react';
import { FormattedMessage } from 'react-intl';

import { CloudUploadIcon } from '@icons';
import type { FileUploadZoneProps } from './types';
import messages from './messages';

export const FileUploadZone: React.FC<FileUploadZoneProps> = ({
  onFileChange,
  onDrop,
  isDragging,
  setIsDragging,
  fileInputRef,
  error,
}) => {
  return (
    <div
      className={`border-2 border-dashed rounded-xl p-12 text-center transition-colors ${
        isDragging ? 'border-amber-500 bg-amber-50' : 'border-gray-300 bg-gray-50 hover:bg-gray-100'
      }`}
      onDragOver={(e) => {
        e.preventDefault();
        setIsDragging(true);
      }}
      onDragLeave={() => {
        setIsDragging(false);
      }}
      onDrop={onDrop}
    >
      <div className="flex flex-col items-center justify-center space-y-4">
        <CloudUploadIcon className="w-12 h-12 text-gray-400" />
        <div className="text-gray-600">
          <p className="font-medium text-lg">
            <FormattedMessage {...messages.dragDrop} />
          </p>
          <p className="text-sm">
            <FormattedMessage {...messages.or} />
          </p>
        </div>
        <label className="cursor-pointer bg-white px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50">
          <FormattedMessage {...messages.browse} />
          <input ref={fileInputRef} type="file" accept=".json" className="hidden" onChange={onFileChange} />
        </label>
        {error !== null && <p className="text-red-500 text-sm mt-4">{error}</p>}
      </div>
    </div>
  );
};
