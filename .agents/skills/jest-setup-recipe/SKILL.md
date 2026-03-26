---
name: jest-setup-recipe
description: Reusable Jest setup recipe for React + TypeScript + ESM projects using ts-jest and jsdom. Use when creating or validating the unit test runtime.
---

# Jest Setup Recipe

## Goal
Provide a stable Jest runtime for React and TypeScript with ESM support.

## Extracted Source (Current Project)
- Config file: `jest.config.ts`
- Preset: `ts-jest/presets/default-esm`
- Environment: `jsdom`
- Setup file: `src/setupTest.tsx`
- ESM extensions: `.ts`, `.tsx`
- TS transform: `ts-jest` with `tsconfig.test.json`
- Aliases aligned with Vite/TS paths (`@ui`, `@icons`, `@components`, `@src`)

## Dependencies
- `jest`
- `ts-jest`
- `jest-environment-jsdom`
- `@testing-library/react`
- `@testing-library/jest-dom`

## Runbook
1. Execute tests with coverage:
```bash
npm test
```
2. Ensure alias mapping in Jest stays synchronized with `tsconfig` and `vite.config.ts`.
3. Keep `setupFilesAfterEnv` consistent with global matchers and test helpers.

## Expected Outcome
Tests run in a browser-like environment with consistent module resolution and stable coverage output.
