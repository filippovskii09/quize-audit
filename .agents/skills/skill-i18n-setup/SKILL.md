---
name: skill-i18n-setup
description: Domain skill for React internationalization setup with react-intl, locale switching, and typed i18n context. Use when adding new translations or extending locale behavior.
---

# i18n Setup Skill

## Goal
Provide a reusable blueprint for typed internationalization with runtime locale switching.

## Extracted Source (Current Project)
- Provider: `src/i18n/I18nProvider.tsx`
- Context: `src/i18n/context.ts`
- Hook: `src/i18n/hooks.ts`
- Types: `src/i18n/types.ts`
- Locale dictionaries:
  - `src/i18n/locales/en.json`
  - `src/i18n/locales/ua.json`

## Dependencies
- `react-intl`
- React Context API

## Runbook
1. Add message IDs to both locale JSON files.
2. Keep `Locale` union in `src/i18n/types.ts` synchronized with supported locales.
3. Wrap app root in `I18nProvider`.
4. Consume locale state via `useI18n` and UI text via `react-intl` APIs.

## Validation
- Toggle locale and confirm persistence in `localStorage` (`app_locale`).
- Verify new message IDs exist in all locale dictionaries.
