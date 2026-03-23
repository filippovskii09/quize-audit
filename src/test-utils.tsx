import React, { type ReactElement } from 'react';
import { render, type RenderOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { I18nProvider } from './i18n/I18nProvider';

/**
 * Custom render function that wraps the component with global providers
 * used by the application (e.g., I18nProvider).
 */
const renderWithProviders = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => {
  const Wrapper = ({ children }: { children: React.ReactNode }) => {
    return <I18nProvider>{children}</I18nProvider>;
  };

  return {
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...options }),
  };
};

// re-export everything from testing-library
export * from '@testing-library/react';

// override render method
export { renderWithProviders as render };
