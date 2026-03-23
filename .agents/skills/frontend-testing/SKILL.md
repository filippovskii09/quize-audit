---
name: Frontend Testing Standards
description: Guidelines and strict rules for testing React components and hooks using Jest and React Testing Library.
---

# Frontend Testing Rules

Enforcement levels: MUST = mandatory · SHOULD = expected default · MAY = optional.

---

## 1. Mission
- MUST write and edit tests only.
- MUST NOT change production behavior unless a testability fix is explicitly approved.

## 2. Scope
- MUST focus on the requested testing task scope only.
- MUST explicitly avoid out-of-scope areas.

## 3. Coverage & Definition of Done
- MUST ensure tests are valid and deterministic.
- MUST target at least **90% coverage** for the requested target area.
- MUST cover positive, negative, and edge cases for target behavior.
- MUST include empty/non-empty states where relevant.

## 4. Testing Philosophy
- MUST test **behavior**, not implementation details.
- MUST validate user-visible outcomes.
- SHOULD prefer integration-style component tests over low-value unit internals when both are possible.
- MUST use isolated unit tests for complex business logic, pure functions, calculations, and specific edge cases.
- MUST validate initial UI state before user action when the behavior depends on that state.
  > *Example: assert "button not shown" → user clicks → "button appears".*

---

## 5. RTL Query Strategy

### 5.1 Always use `screen`
- MUST use `screen` for all queries — do not destructure query methods from the `render` return value.
- Exception: `rerender`, `unmount` may be destructured from `render`.

```typescript
// ❌
const { getByRole } = render(<Example />)
getByRole('alert')

// ✅
render(<Example />)
screen.getByRole('alert')
```

### 5.2 Query priority order

| Priority | Query |
|---|---|
| 1 ✅ | `getByRole` / `findByRole` |
| 2 | `getByLabelText`, `getByPlaceholderText`, `getByText`, `getByDisplayValue` |
| 3 | `getByAltText`, `getByTitle` |
| 4 ⚠️ last resort | `getByTestId` |

- MUST NOT use `container.querySelector` for primary assertions.
- SHOULD prefer `within(container)` when multiple similar elements exist.

### 5.3 Accessibility attributes
- MUST NOT add redundant `role` or `aria-*` attributes that duplicate implicit HTML semantics.
- SHOULD follow WAI-ARIA Authoring Practices for non-native UI elements.
- If you cannot query an element by role without adding an explicit role — fix the HTML markup, not the test.

```typescript
// ❌ — redundant, <button> already has role="button"
<button role="button">Click me</button>

// ✅
<button>Click me</button>
```

---

## 6. Interaction & Async Rules
- MUST use `@testing-library/user-event` for user interactions (not `fireEvent`).
- MUST use `findBy*` for async appearance.
- MUST use `waitFor` only with a concrete assertion inside.
- MUST keep side effects outside `waitFor`.
- MUST use `queryBy*` only for non-existence assertions.

---

## 7. Mocking & Test Data
- MUST NOT mock internal components unless technically required.
- SHOULD mock network at the boundary level (MSW preferred where applicable).
- MUST globally mock browser APIs absent in JSDOM (e.g. `ResizeObserver`) in `tests/setup.ts` — not in individual test files.
- MUST keep business-logic mocks local and deterministic.
- SHOULD use centralized fixtures (JSON/TS) for complex response payloads.
- MUST keep fixture structure aligned with the real API/data schema.
- MUST reuse existing project fixtures/constants/messages when equivalent values already exist.
- SHOULD build scenario-specific fixtures via small factory helpers instead of duplicating ad-hoc object literals.

---

## 8. Assertions & Readability

### 8.1 Use `jest-dom` semantic matchers
- MUST use `@testing-library/jest-dom` matchers instead of raw DOM property checks:

| Instead of | Use |
|---|---|
| `.disabled === true` | `.toBeDisabled()` |
| `.textContent === 'foo'` | `.toHaveTextContent('foo')` |
| `getComputedStyle(el).display !== 'none'` | `.toBeVisible()` |
| `el !== null` | `.toBeInTheDocument()` |

### 8.2 No hardcoded domain strings
- MUST NOT use hardcoded text/label strings in assertions when a constant or i18n message key exists.
- MUST use project constants/enums:

```typescript
// ✅
APP_MODE.IDLE

// ❌
'idle'
```

- MUST use project i18n message `defaultMessage` when UI text is message-driven:

```typescript
// ✅
import messages from '../messages';
expect(el).toHaveTextContent(messages.submitBtn.defaultMessage);

// ❌
expect(el).toHaveTextContent('Start Audit');
```

- MAY use hardcoded strings only if no constant/message exists — this must be justified in the PR/summary.

### 8.3 General
- MUST prefer readable extraction over positional chains like `mock.calls[0][1]`.
- SHOULD prefer object-level assertions (`toEqual`, `toMatchObject`) for payload checks.
- MUST align assertions with test intent — test description MUST match what the test body actually verifies.
- SHOULD scope assertions using `within()` when multiple similar elements exist.

---

## 9. `act` Usage
- MUST NOT wrap `render` or standard `userEvent` flows in manual `act`.
- MUST use `act` for explicit timer advancement:

```typescript
// ✅ correct use of act
act(() => {
  jest.advanceTimersByTime(500);
});
```

---

## 10. Stability & Speed
- MUST avoid flaky assertions and race-prone timing assumptions.
- SHOULD keep tests small and parallelizable.
- SHOULD avoid heavy setup per test when shared setup is possible.

---

## 11. Domain Consistency
Before writing assertions, MUST run a constants/messages discovery step:
1. Check feature-local files: `constants.ts`, `messages.ts`, `__mocks__/`.
2. Search within the target feature for exported constants/messages.
3. Reuse them if equivalent.

---

## 12. Style Conventions
- MUST follow AAA structure: **Arrange → Act → Assert**.
- SHOULD keep `describe` blocks shallow (max 2 levels deep).
- MUST use descriptive `it` / `test` names that match the test body behavior.
- MUST NOT add boilerplate cleanup if the framework handles it automatically (Jest + RTL auto-cleanup is enabled via `setupFilesAfterEnach`).
- MUST NOT assert or query by CSS class names:

```typescript
// ❌ tests implementation detail
container.querySelector('.my-3')

// ✅ tests behavior
screen.getByRole('alert')
```

- MUST NOT use DOM traversal (`.closest()`, `.parentElement`) in assertions.

---

## 13. Test File Placement

Test files follow a **proximity rule** — keep specs close to source:

### Single spec file
Place directly alongside the source file (in the same folder):

```
src/components/ui/Button/
  index.tsx
  types.ts
  index.spec.tsx   ← ✅ single spec, stays in component root
```

### Multiple spec files
When a folder has **two or more** spec files, MUST move all into `__tests__/`:

```
src/hooks/
  useLocalStorage.ts
  usePagination.ts
  __tests__/
    useLocalStorage.spec.ts   ← ✅ multiple specs → __tests__/
    usePagination.spec.ts
```

> This rule applies everywhere: `src/components/**`, `src/hooks/`, `src/utils/`, etc.

---

## 14. Custom Hook Testing

### 14.1 Test hooks through a component by default
- SHOULD test hooks by rendering a real component and asserting on visible behavior.
- Use `renderHook` only when the hook has many independent edge cases, or is a published shared hook.

### 14.2 `renderHook` rules
- MUST access hook return values via `result.current`.
- MUST wrap state-updating calls in `act()`.
- MUST use `waitFor` for async hooks.
- Import from `@testing-library/react` (React 18):

```typescript
import { renderHook, act } from '@testing-library/react';
```

### 14.3 Cleanup
- SHOULD use `rerender` (from `renderHook` return) to test prop changes.
- SHOULD use `unmount` to test `useEffect` teardown.

### 14.4 Hooks with context/providers
- MUST pass a `wrapper` to `renderHook` when the hook requires context.
- MUST NOT mock context values directly — use the real Provider.

### 14.5 Hard prohibitions
- MUST NOT call a custom hook as a plain function in a test.
- MUST NOT mock built-in React hooks (`useState`, `useEffect`, etc.).

---

## 15. Provider / Context Wrapping

### 15.1 Use `src/test-utils.tsx`
- MUST NOT inline provider boilerplate in individual test files.
- MUST import `render` from `@src/test-utils` — it wraps all required providers automatically.
- SHOULD re-export all `@testing-library/react` exports from `test-utils` so tests have a single import source.

```typescript
// ✅
import { render, screen } from '@src/test-utils';

// ❌
import { screen } from '@testing-library/react';
import { renderWithProviders } from '@src/test-utils';
```

### 15.2 What belongs in the wrapper
Only providers needed by the **majority** of components:
- `I18nProvider` (project uses `react-intl`)

Providers needed by only one or two tests MUST NOT be added to the global wrapper.
