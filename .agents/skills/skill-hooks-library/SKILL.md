---
name: skill-hooks-library
description: Domain skill for reusable typed React hooks used in business logic. Use when extending or validating shared hooks like local storage and pagination.
---

# Hooks Library Skill

## Goal
Capture patterns for shared, typed hooks that power reusable frontend logic.

## Extracted Source (Current Project)
- Hook exports: `src/hooks/index.ts`
- `useLocalStorage`: `src/hooks/useLocalStorage.ts`
- `usePagination`: `src/hooks/usePagination.ts`
- Hook tests:
  - `src/hooks/__tests__/useLocalStorage.spec.ts`
  - `src/hooks/__tests__/usePagination.spec.ts`

## Dependencies
- React hooks (`useState`)
- Jest + Testing Library test runtime

## Runbook
1. Keep hooks generic and typed (`<T>` where relevant).
2. Export every shared hook from `src/hooks/index.ts`.
3. Add or update tests in `src/hooks/__tests__` for every behavior branch.
4. Run hook tests after any hook contract change.

## Validation
- Local storage operations are resilient to JSON parse/write errors.
- Pagination bounds never exceed `[1, totalPages]`.
- API signatures remain backward compatible for callers.
