---
name: Import Ordering and Style Standards
description: Rules for grouping, sorting, and formatting imports in React/TypeScript projects to ensure consistency and readability.
---

# Import Ordering and Style Standards

To maintain a clean and scanable codebase, all JavaScript and TypeScript files must adhere to strict import sorting rules.

---

## 1. Import Grouping

Imports must be organized into **exactly two groups**, separated by a **single blank line**.

### Group 1: Third-party Modules
Includes any library or package imported from `node_modules`.
- Examples: `react`, `react-router-dom`, `framer-motion`, `lucide-react`.

### Group 2: Local Modules
Includes absolute paths using aliases (e.g., `@ui`, `@hooks`) & relative paths (e.g., `../`, `./`).
- Sort local imports from **farthest to nearest** relative to the current file.
- **Style imports** (e.g., `import './Component.css'`) always go at the **very end** of this local group.

---

## 2. Order of Local Imports (Farthest to Nearest)

To create a visual "funnel" and help readers quickly gauge dependencies, order local imports as follows:

1.  **Path Aliases** (e.g., `@ui`, `@hooks`, `@appTypes`)
2.  **Parent Directory Imports** (e.g., `../../../Component`, `../../routes`, `../StaffRoute`) — *Ordered from deepest parent to closest parent.*
3.  **Sibling Directory & Relative Sub-directory** (e.g., `./messages`, `./utils`, `./components`)
4.  **Barrels & Direct Directory** (e.g., `.`, `./index`)
5.  **Side-Effect Style Imports** (e.g., `./Component.scss`, `./style.css`)

---

## 3. Path Alias Conventions

Deep relative paths (three or more levels of back-tracking, e.g., `../../../`) are fragile and hard to read.
Use configured path aliases instead of deeply nested relative paths.

- **Use Alias**: `import { Button } from '@ui'` instead of `import { Button } from '../../../components/ui/Button'`
- **Keep Relative**: `import { messages } from './messages'` or `import { helpers } from '../utils'`

*Always verify aliases are active in `tsconfig.json` and build toolings before applying.*

---

## 4. Examples

### Correct Usage

```typescript
// --- Group 1: Third-party ---
import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// --- Group 2: Local (Farthest to nearest) ---
import { QuestionCard } from '@student';
import { Button } from '@ui';
import { usePagination } from '@hooks/usePagination';
import { ROUTES } from '../../routes';
import { StaffRoute } from '../generic/StaffRoute';
import { helpers } from '../utils';
import { messages } from './messages';
import { LocalHeader } from './components/LocalHeader';
import './Component.css'; // Side-effect styles LAST
```

---

## 5. Guiding Principles

- **Never Mix Groups**: Mixing third-party and local imports causes ESLint to flag errors and confuses scopes.
- **Single Blank Line**: Keep exactly one blank space between the groups.
- **Linter Support**: Always run your linter/formatter (e.g., `npm run lint`) after restructuring imports to satisfy standard rules.
