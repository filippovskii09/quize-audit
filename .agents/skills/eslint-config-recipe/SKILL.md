---
name: eslint-config-recipe
description: Reusable recipe for strict type-aware ESLint configuration in React and TypeScript projects. Use when setting up or validating lint architecture.
---

# ESLint Config Recipe

## Goal
Standardize strict, type-aware linting for React + TypeScript codebases.

## Extracted Source (Current Project)
- Config file: `eslint.config.js`
- Base: `@eslint/js` recommended
- TS profiles: `typescript-eslint` strict + stylistic type-checked presets
- Plugins: `react-hooks`, `react-refresh`, `prettier`
- Type-aware parser projects:
  - `tsconfig.app.json`
  - `tsconfig.node.json`

## Key Rules
- Ban unused variables unless prefixed with `_`
- Disallow `any`
- Require no floating promises
- Require await when async is declared
- Enable hooks rules and refresh export checks

## Dependencies
- `eslint`
- `typescript-eslint`
- `@eslint/js`
- `eslint-plugin-react-hooks`
- `eslint-plugin-react-refresh`
- `eslint-plugin-prettier`
- `eslint-config-prettier`

## Runbook
1. Execute lint:
```bash
npm run lint
```
2. Auto-fix where applicable:
```bash
npm run lint:fix
```
3. Validate parser project references remain aligned with TypeScript configs.
