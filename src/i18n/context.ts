import { createContext } from 'react';

import type { I18nContextProps } from './types';

export const I18nContext = createContext<I18nContextProps>({
  locale: 'en',
  toggleLocale: () => {
    // default
  },
});
