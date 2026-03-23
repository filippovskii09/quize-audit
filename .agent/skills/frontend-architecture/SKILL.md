---
name: Frontend Architecture Standards
description: Guidelines and strict rules for scaffolding React components, interfaces, and maintaining alias imports.
---

# Frontend Architecture Standards

This skill defines the rules for scaffolding React components, managing types, structuring folders, and defining import strategies. **You MUST follow these rules any time you create, refactor, or structure React code.**

## 1. Import Aliases
Always utilize configured TypeScript/Vite path aliases where applicable. Do not use relative paths `../../` for global modules.
- `@ui` -> Reusable UI components from `src/components/ui`
- `@components` -> Feature-based components from `src/components` (e.g., `@components/admin`, `@components/student`)
- `@src` -> Root source directory (e.g., `@src/types`, `@src/hooks`, `@src/data`)

*Example:*
```typescript
// BAD
import { Button } from '../../ui/Button';
import type { Question } from '../../../types';
import { useLocalStorage } from '../../../hooks/useLocalStorage';

// GOOD
import { Button } from '@ui';
import type { Question } from '@src/types';
import { useLocalStorage } from '@src/hooks';
```

## 2. Interface Segregation
Never define `interface` or complex `type` declarations inside the same file as the component's logical code (`index.tsx`). 
The component file should remain completely clean and focused on rendering and logic.
- Place interfaces in a neighboring `types.ts` file.

*Example:*
```typescript
// src/components/ui/Button/types.ts
export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

// src/components/ui/Button/index.tsx
import React from 'react';
import type { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ variant }) => { /* ... */ };
```

## 3. Directory Structure and Modularity (Component Folders)
Every component MUST have its own directory. A component folder should look like this (extend based on complexity):
```text
/ComponentName/
  ├── index.tsx         # The main root component
  ├── index.spec.tsx    # (if applicable) unit tests
  ├── hooks.ts          # Local custom hooks to decouple complex logic
  ├── types.ts          # Component-specific interfaces/types
  ├── utils.ts          # Pure utility functions for this component
  ├── constants.ts      # Component-level static variables
  ├── messages.ts       # (if i18n) translation dictionaries
  └── components/       # Folder for children sub-components
		├── ChildComponent.tsx
		├── SecondChildComponent.tsx
		└── index.ts      # Barrel file re-exporting children (e.g., export * from './ChildComponent')
```

### Component Parent-Child Paradigm
If a sub-component belongs strictly to a parent component, it goes inside the `components` directory.
Always export children via a barrel `index.ts` so the parent imports cleanly:
```typescript
// Inside parent: src/components/admin/AdminDashboard/index.tsx
import { ChildComponent } from './components';
```

## 4. Logic Decoupling (Custom Hooks)
Component logic (data fetching, local component state tracking, complex payload parsing) MUST be extracted into a `hooks.ts` file near the component. This leaves `index.tsx` as a purely presentational shell orchestrating the UI.

*Example:*
```typescript
// AdminDashboard/hooks.ts
export const useAdminDashboard = () => {
    const [data, setData] = useState(null);
    const handleFile = () => { /* ... */ };
    return { data, handleFile };
}

// AdminDashboard/index.tsx
import { useAdminDashboard } from './hooks';

export const AdminDashboard = () => {
    const { data, handleFile } = useAdminDashboard();
    return <UploadView onFile={handleFile} data={data} />;
}
```

## 5. Barrel Files (index.ts)
Always create an `index.ts` barrel file at the root of a feature or helper directory (e.g., `src/components/admin`, `src/hooks`, `src/data`) to export main components, hooks, or constants.

This prevents duplicating names in imports and keeps things clean.

*Example:*
```typescript
// src/components/admin/index.ts
export * from './AdminDashboard';

// src/App.tsx
import { AdminDashboard } from '@components/admin'; // Clean and understandable import
```

## 6. Icons Management
Do not write or paste inline `<svg>` structures into feature-component layout trees. It litters the layout with nodes and kills read sync.
- Create a corresponding `<IconName>Icon.tsx` component inside `src/components/icons`.
- Setup it up to accept generic `IconProps` supporting standard SVG and class overrides.
- Use the `@icons` alias to include and use cleanly.

*Example:*
```typescript
// src/components/icons/SettingsIcon.tsx
export const SettingsIcon = ({ className }) => (<svg className={className}> ... </svg>);

// Inside page:
import { SettingsIcon } from '@icons';
```
## 7. State and Status Constants (Avoiding String Literals)
When building state machines, routing modules, or maintaining statuses, always use mapped constant objects with `as const` instead of raw string literal unions for operational parameters.

This prevents typo-bugs and provides a single point of failure updating. Avoid using `enum` when configuring Vite/TypeScript speedups might block transformers.

*Example:*
```typescript
// types.ts
export const AppMode = {
  IDLE: 'idle',
  STUDENT: 'student',
  ADMIN: 'admin',
} as const;

export type AppState =
  | { mode: typeof AppMode.IDLE }
  | { mode: typeof AppMode.STUDENT }
  | { mode: typeof AppMode.ADMIN };

// App.tsx
import { AppMode } from './types';

const [state, setState] = useState<AppState>({ mode: AppMode.IDLE });
if (state.mode === AppMode.ADMIN) { /* ... */ }
```
