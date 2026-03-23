---
name: Import Ordering and Style Standards
description: Rules for grouping, sorting, and formatting imports in React/TypeScript projects to ensure consistency and readability.
---

# Import Ordering and Style Standards

Enforcement levels: MUST = mandatory · SHOULD = expected default · MAY = optional.

---

## 1. Import Group Order

Imports MUST be organized in the following groups, separated by a **single blank line** between each group:

```
Group 1: External libraries (react, react-intl, etc.)
Group 2: Internal aliases (@src, @ui, @icons, @components)
Group 3: Relative imports (./types, ./utils, ../shared)
```

```typescript
// ✅ Correct

import React from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@ui';
import { APP_MODE } from '@src/constants';
import type { AppState } from '@src/types';

import type { MyComponentProps } from './types';
import { helperFn } from './utils';
```

---

## 2. Sorting Within Groups

- MUST sort imports **alphabetically** by module path within each group.
- MUST place `type`-only imports **after** value imports in the same group.

```typescript
// ✅
import { FormattedMessage, useIntl } from 'react-intl';
import React from 'react';

// ❌ — 'react' should come before 'react-intl' alphabetically
import { FormattedMessage } from 'react-intl';
import React from 'react';
```

---

## 3. Type-Only Imports

- MUST use `import type` (or inline `{ type X }`) for any import used only as a TypeScript type.
- MUST NOT import types as values — this is required when `verbatimModuleSyntax` is enabled.

```typescript
// ✅
import type { ButtonProps } from './types';
import { type ReactElement } from 'react';

// ❌
import { ButtonProps } from './types';
```

---

## 4. Blank Lines Between Groups

- MUST have exactly **one blank line** between import groups.
- MUST have exactly **one blank line** between the last import and the first non-import line.
- MUST NOT have blank lines **within** a group.

```typescript
// ✅
import React from 'react';
import { useIntl } from 'react-intl';

import { Button } from '@ui';

import type { Props } from './types';

export const MyComponent = ...

// ❌ — blank line inside a group
import React from 'react';

import { useIntl } from 'react-intl';
```

---

## 5. No Unused Imports

- MUST NOT leave unused imports in files.
- TypeScript `noUnusedLocals` enforces this at build time; ESLint enforces it in development.

---

## 6. Named vs Default Imports

- SHOULD prefer **named exports/imports** for all project-internal code.
- MAY use default imports only for third-party libraries that export defaults (e.g., `import React from 'react'`).

```typescript
// ✅ internal code
export const Button = ...
import { Button } from '@ui';

// ❌ internal code
export default Button;
import Button from '@ui/Button';
```

---

## 7. Alias Usage vs Relative Paths

- MUST use path aliases (`@src`, `@ui`, `@icons`, `@components`) for all cross-directory imports.
- MUST use relative paths (`./`, `../`) only within the **same component folder**.

```typescript
// ✅
import { useLocalStorage } from '@src/hooks';
import type { ButtonProps } from './types';

// ❌
import { useLocalStorage } from '../../hooks/useLocalStorage';
```

---

## 8. No Side-Effect-Only Imports in Component Files

- MUST NOT have bare side-effect imports (e.g., `import './styles.css'`) in component files unless necessary.
- Style side-effect imports SHOULD live in `main.tsx` or the top-level entry point only.
