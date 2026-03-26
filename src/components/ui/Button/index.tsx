import type { FC } from 'react';

import type { ButtonProps } from './types';

export const Button: FC<ButtonProps> = ({ variant = 'primary', className = '', children, ...props }) => {
  const baseClasses =
    'px-6 py-2 rounded-md transition-colors shadow-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2';

  const variants = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    success: 'bg-green-600 text-white hover:bg-green-700 focus:ring-green-500',
    secondary:
      'border border-gray-300 text-gray-700 bg-white hover:bg-gray-50 focus:ring-gray-500 disabled:opacity-50 disabled:cursor-not-allowed',
  };

  return (
    <button className={`${baseClasses} ${variants[variant]} ${className}`} {...props}>
      {children}
    </button>
  );
};
