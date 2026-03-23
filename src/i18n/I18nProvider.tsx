import React, { useState } from 'react';
import { IntlProvider } from 'react-intl';

import enMessages from './locales/en.json';
import uaMessages from './locales/ua.json';
import type { Locale } from './types';
import { I18nContext } from './context';

const LOCALES: Record<Locale, Record<string, string>> = {
  en: enMessages,
  ua: uaMessages,
};

const getInitialLocale = (): Locale => {
  const savedLocale = localStorage.getItem('app_locale');
  if (savedLocale === 'en' || savedLocale === 'ua') {
    return savedLocale;
  }
  const browserLang = navigator.language.slice(0, 2);
  return browserLang === 'uk' || browserLang === 'ru' ? 'ua' : 'en';
};

export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocale] = useState<Locale>(getInitialLocale);

  const toggleLocale = () => {
    const nextLocale = locale === 'en' ? 'ua' : 'en';
    setLocale(nextLocale);
    localStorage.setItem('app_locale', nextLocale);
  };

  return (
    <I18nContext.Provider value={{ locale, toggleLocale }}>
      <IntlProvider locale={locale === 'ua' ? 'uk' : 'en'} messages={LOCALES[locale]}>
        {children}
      </IntlProvider>
    </I18nContext.Provider>
  );
};
