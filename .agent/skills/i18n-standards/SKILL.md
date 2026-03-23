---
name: React Internationalization (i18n) Standards
description: Centralized guidelines on how to structure and consume i18n features using react-intl.
---

# React Internationalization (i18n) Standards

This application uses the `react-intl` library to support multiple languages (English and Ukrainian) and maintain a globally scalable codebase without hardcoded strings.

## Extracted Insights & Best Practices

Based on industry standards (like Open edX and Atlassian implementations), using `react-intl` requires several strict paradigms to ensure typesafety, context for translators, and correct extraction pipelines.
1. **Never string-concatenate**: Translators need whole phrases for proper grammatical structuring.
2. **Component-scoped definitions**: Message mappings live next to the components to decouple domain structures.
3. **Pluralization**: Rely on formatting constructs (`{count, plural, ...}`) instead of logical branching in JS (`count > 1 ? 'items' : 'item'`).

---

## 1. Message Definitions (`messages.ts`)

Any component requiring text must define a `messages.ts` file parallel to its `index.tsx`. 
YouMUST wrap definitions using `defineMessages` from `react-intl`.

### Rules for `messages.ts`
- **ID Formatting**: Use dot-notation mapped to the component tree. Example: `auditTool.components.AdminDashboard.title`.
- **Default Message**: Always define the primary language phrase (usually English) in `defaultMessage`.
- **Description**: Add brief `description` metadata to give context to translators.

*Example:*
```typescript
// src/components/admin/AdminDashboard/messages.ts
import { defineMessages } from 'react-intl';

export default defineMessages({
  dashboardTitle: {
    id: 'app.admin.AdminDashboard.dashboardTitle',
    defaultMessage: 'Admin Dashboard',
    description: 'Main heading title for the Admin Dashboard page',
  },
  reviewSubtitle: {
    id: 'app.admin.AdminDashboard.reviewSubtitle',
    defaultMessage: 'Review exported audit results.',
    description: 'Subtitle for the Admin Dashboard explaining its purpose',
  },
});
```

---

## 2. Using Translations in Components

### The `<FormattedMessage>` component (Preferred)
For regular rendering inside DOM elements, use the `FormattedMessage` component. Pass the extracted object from `messages.ts`.

```typescript
import { FormattedMessage } from 'react-intl';
import messages from './messages';

export const AdminDashboard = () => (
  <h2><FormattedMessage {...messages.dashboardTitle} /></h2>
);
```

### The `useIntl` Hook (For strings only)
When you must pass raw strings (e.g., `placeholder`, `aria-label`, `title`), use the `useIntl` hook.

```typescript
import { useIntl } from 'react-intl';
import messages from './messages';

export const InputForm = () => {
  const intl = useIntl();
  
  return (
    <input 
      type="text" 
      placeholder={intl.formatMessage(messages.searchPlaceholder)} 
    />
  );
};
```

---

## 3. Dynamic Variables & Pluralization

Always use translation variables (`values` prop) over string concatenation.

*Example with Variables:*
```typescript
// messages.ts
greeting: {
  id: 'app.user.greeting',
  defaultMessage: 'Welcome back, {userName}!',
}

// Component
<FormattedMessage {...messages.greeting} values={{ userName: user.name }} />
```

*Example with Plurals:*
```typescript
// messages.ts
itemCount: {
  id: 'app.cart.itemCount',
  defaultMessage: 'You have {count, plural, =0 {no items} one {1 item} other {# items}} in your cart.'
}
```

---

## 4. Root i18n Configuration

The entire React tree must be wrapped in `<IntlProvider locale={locale} messages={messages}>`. 
Language packs (JSON files mapped by ID) are stored centrally at the top level or lazy-loaded depending on size.
