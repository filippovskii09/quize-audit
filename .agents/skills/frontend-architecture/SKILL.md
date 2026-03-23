---
name: Frontend Architecture Standards
description: Guidelines and strict rules for scaffolding React components, interfaces, and maintaining alias imports.
---

# Frontend Architecture Standards

Enforcement levels: MUST = mandatory · SHOULD = expected default · MAY = optional.

---

## 1. Component Structure

Every component MUST live in its own folder:

```
src/components/<domain>/<ComponentName>/
  index.tsx     ← component implementation
  types.ts      ← prop interfaces
  index.spec.tsx ← tests (if single spec file)
  __tests__/    ← used when multiple spec files exist
```

- MUST export the component as a **named export** (not default).
- MUST define props via a dedicated `types.ts` file inside the component folder.
- MUST NOT define props inline inside `index.tsx`.

---

## 2. Component Domain Grouping

Components are grouped into domain-specific subdirectories under `src/components/`:

| Directory | Contains |
|---|---|
| `ui/` | Shared, generic, stateless UI primitives (Button, ProgressBar, etc.) |
| `student/` | Feature components for the student role |
| `admin/` | Feature components for the admin role |
| `icons/` | SVG icon components (see §6) |

- MUST NOT mix domain components into `ui/`.
- MUST NOT import cross-domain components directly — use barrel exports (`index.ts`).

---

## 3. Alias Imports

The project uses path aliases defined in `vite.config.ts` and `tsconfig.app.json`:

| Alias | Resolves to |
|---|---|
| `@ui` | `src/components/ui` |
| `@icons` | `src/components/icons` |
| `@components` | `src/components` |
| `@src` | `src/` |

- MUST use aliases for all cross-directory imports.
- MUST NOT use relative `../` paths for cross-folder imports.
- MUST use relative `./` only for imports within the **same component folder**.

```typescript
// ✅
import { Button } from '@ui';
import { useLocalStorage } from '@src/hooks';

// ❌
import { Button } from '../../../components/ui/Button';
```

---

## 4. Barrel Exports

- Every domain folder MUST have an `index.ts` that re-exports its contents.
- Barrel files MUST use named re-exports only (`export * from './...'` or `export { X } from './...'`).
- MUST NOT import from sub-paths when a barrel exists:

```typescript
// ✅
import { ProgressBar } from '@ui';

// ❌
import { ProgressBar } from '@ui/ProgressBar';
```

---

## 5. TypeScript Conventions

- MUST use `interface` for component props and object shapes.
- MUST use `type` only for aliases and union types.
- MUST use `as const` for constant literals (not enums — see §7).
- MUST use `type` keyword for type-only imports when `verbatimModuleSyntax` is enabled:

```typescript
import type { ButtonProps } from './types';
import { type ReactElement } from 'react';
```

---

## 6. SVG Icon Components

All SVG icons MUST be extracted into standalone React components under `src/components/icons/`:

```
src/components/icons/
  SettingsIcon.tsx
  ClipboardIcon.tsx
  index.ts         ← barrel export
```

- MUST NOT inline `<svg>` markup directly inside feature components.
- Icon components MUST accept standard SVG props (`className`, `width`, `height`) via spread.
- Import icons exclusively via the `@icons` alias:

```typescript
// ✅
import { SettingsIcon } from '@icons';

// ❌
import { ReactComponent as SettingsIcon } from '../../assets/settings.svg';
```

---

## 7. State and Status Constants

Application-level state constants (modes, statuses, flags) MUST follow these rules:

### Location
All shared constants MUST live in `src/constants/index.ts`.

### Naming Convention
Constants MUST use `UPPER_SNAKE_CASE`:

```typescript
// ✅
export const APP_MODE = { IDLE: 'idle', STUDENT: 'student', ADMIN: 'admin' } as const;

// ❌
export const AppMode = { ... };
export enum AppMode { ... }
```

### Syntax
- MUST use `as const` objects.
- MUST NOT use TypeScript `enum` (incompatible with some build tool optimizations).

### Usage
- MUST reference constants in all comparisons and assignments:

```typescript
// ✅
setAppState({ mode: APP_MODE.IDLE });
if (appState.mode === APP_MODE.ADMIN) { ... }

// ❌
setAppState({ mode: 'idle' });
if (appState.mode === 'admin') { ... }
```

### Deriving Types
Derive union types from constants using `typeof`:

```typescript
export const APP_MODE = { IDLE: 'idle', STUDENT: 'student', ADMIN: 'admin' } as const;
export type AppMode = (typeof APP_MODE)[keyof typeof APP_MODE];
```

---

## 8. Test File Placement

Test files follow a **proximity rule** — tests live as close as possible to their source:

### Single spec file
If a folder contains **only one** spec file, place it directly alongside the source:

```
src/components/ui/Button/
  index.tsx
  types.ts
  index.spec.tsx   ← ✅ only one spec, stays in root of component folder
```

### Multiple spec files
If a folder contains **two or more** spec files (e.g., `index.spec`, `utils.spec`, `hooks.spec`), MUST move all specs into a `__tests__/` subfolder:

```
src/hooks/
  useLocalStorage.ts
  usePagination.ts
  __tests__/
    useLocalStorage.spec.ts   ← ✅ multiple specs → __tests__/
    usePagination.spec.ts
```

> The rule applies to both `src/components/**` and `src/hooks/`, `src/utils/` etc.
