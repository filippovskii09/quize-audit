import type { FC } from 'react';

import type { CategoryBadgeProps } from './types';

export const CategoryBadge: FC<CategoryBadgeProps> = ({ category, color = 'blue' }) => {
  const colorClasses = color === 'purple' ? 'text-purple-600 bg-purple-50' : 'text-blue-600 bg-blue-50';

  return (
    <span className={`text-xs font-semibold uppercase tracking-wider px-2 py-1 rounded ${colorClasses}`}>
      {category}
    </span>
  );
};
