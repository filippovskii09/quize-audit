export type Locale = 'en' | 'ua';

export interface I18nContextProps {
  locale: Locale;
  toggleLocale: () => void;
}
