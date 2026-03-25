import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  waitFor,
  within,
  screen,
  cleanup,
  act,
  fireEvent,
} from '@testing-library/react';
import type { RenderOptions, RenderHookOptions } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';

import { I18nProvider } from '@src/i18n/I18nProvider';

/**
 * Common wrapper component for providers.
 */
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  return <I18nProvider>{children}</I18nProvider>;
};

/**
 * Custom render function that wraps the UI with necessary providers
 */
function render(ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) {
  return rtlRender(ui, { wrapper: TestWrapper, ...options });
}

/**
 * Custom renderHook function that wraps the hook with necessary providers
 */
function renderHook<Result, Props>(
  callback: (initialProps: Props) => Result,
  options?: Omit<RenderHookOptions<Props>, 'wrapper'>
) {
  return rtlRenderHook(callback, { wrapper: TestWrapper, ...options });
}

export { render, renderHook, within, waitFor, screen, userEvent, cleanup, act, fireEvent, jest };
