import React from 'react';

import type { ProgressBarProps } from './types';

export const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
  const percentage = total > 0 ? (current / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-2.5 mb-8 overflow-hidden">
      <div
        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300 ease-in-out"
        style={{ width: `${percentage.toString()}%` }}
      />
    </div>
  );
};
