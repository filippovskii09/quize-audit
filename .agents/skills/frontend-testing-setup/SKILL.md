---
name: Frontend Testing Setup
description: Step-by-step instructions for scaffolding and maintaining the test environment with Jest and React Testing Library using a centralized approach.
---

# Frontend Testing Setup Standards

These step-by-step guidelines outline the optimal architecture for setting up and maintaining testing environments. We explicitly mandate using **Jest** and **React Testing Library (RTL)** with a clean, centralized configuration.

## Step 1: Initialize Testing Tools
1. **Використовувати Jest**: основний runner для тестів.
2. **Використовувати React Testing Library**: основний інструмент для тестування компонентів.
Встановіть необхідні залежності (`jest`, `@testing-library/react`, `@testing-library/user-event`, `@testing-library/jest-dom`), якщо вони ще не встановлені.

## Step 2: Create Centralized `setupTest` File
**В корені проекту (у директорії `src/`) створіть централізований файл `setupTest.tsx` (або `.jsx`).** 
У цьому файлі зберігатимуться:
- Глобальні імпорти для Jest (`jest-dom`).
- Кастомні обгортки (wrappers) з усіма необхідними провайдерами (`ReactQuery`, `MemoryRouter`, `I18nProvider` тощо). 
- Реекспорти всього необхідного з `@testing-library/react`.

### Приклад `src/setupTest.tsx`:
```tsx
import '@testing-library/jest-dom';
import React, { type ReactElement } from 'react';
import {
  render as rtlRender,
  renderHook as rtlRenderHook,
  screen, waitFor, within, act, fireEvent, cleanup,
  type RenderOptions, type RenderHookOptions
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { jest } from '@jest/globals';

// Імпортуйте необхідні провайдери вашого проекту
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MemoryRouter } from 'react-router-dom';
import { IntlProvider } from 'react-intl';

/**
 * Common wrapper component for multiple context providers.
 */
const TestWrapper = ({ children, initialEntries = ['/'] }: any) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  });

  return (
    <QueryClientProvider client={queryClient}>
      <MemoryRouter initialEntries={initialEntries}>
        <IntlProvider locale="en">
          {children}
        </IntlProvider>
      </MemoryRouter>
    </QueryClientProvider>
  );
};

function render(ui: ReactElement, { initialEntries, ...options }: any = {}) {
  return rtlRender(ui, { wrapper: (props) => <TestWrapper {...props} initialEntries={initialEntries} />, ...options });
}

function renderHook<Result, Props>(
  callback: (initialProps: Props) => Result,
  { initialEntries, ...options }: any = {}
) {
  return rtlRenderHook(callback, { wrapper: (props) => <TestWrapper {...props} initialEntries={initialEntries} />, ...options });
}

export {
  render, renderHook, screen, waitFor, within, act, fireEvent, cleanup, userEvent, jest
};
```

## Step 3: Configure Alias `@setupTest`
Це єдиний файл, який буде підключатись майже в усі тести, тому зручно використовувати аліас `@setupTest`.
Додайте цей аліас у файли конфігурації:

**В `tsconfig.json` (в блок `paths`):**
```json
  "paths": {
    "@setupTest": ["src/setupTest.tsx"]
  }
```

**В `vite.config.ts`:**
```ts
  resolve: {
    alias: {
      '@setupTest': path.resolve(__dirname, './src/setupTest.tsx'),
    },
  },
```

## Step 4: Implement Tests with the Alias
В усіх файлах тестів (`*.spec.tsx` чи `*.test.tsx`) використовуйте цей аліас. Категорично забороняється імпортувати `render` або `screen` напряму з `@testing-library/react`.

```tsx
import { render, screen, userEvent } from '@setupTest';

// Ваші тести...
```

## Step 5: Configure Jest & Ignore Coverage
Додайте кавередж та всі збірки до ігнорування, а також налаштуйте Jest для використання `setupTest` і аліасу.

**В `.gitignore` додайте:**
```text
coverage/
```

**В `jest.config.ts`:**
```ts
export default {
  // ... інші конфігурації
  setupFilesAfterEnv: ['<rootDir>/src/setupTest.tsx'],
  moduleNameMapper: {
    // Вкажіть аліас для jest:
    '^@setupTest$': '<rootDir>/src/setupTest.tsx',
  },
  // Ігнорування папок, які не потрібно обробляти:
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  coveragePathIgnorePatterns: ['/node_modules/', '/dist/', '/coverage/', 'src/setupTest.tsx'],
};
```
