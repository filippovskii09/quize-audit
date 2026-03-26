---
name: generic-git-hooks
description: Universal Husky and lint-staged recipe for pre-commit automation in JavaScript and TypeScript projects. Use when initializing, auditing, or reusing pre-commit checks.
---

# Generic Git Hooks Skill

## Goal
Extract a reusable pre-commit automation pattern based on Husky and lint-staged.

## Extracted Source (Current Project)
- `package.json` script: `prepare: husky`
- Hook entrypoint: `.husky/pre-commit`
- Hook command: `npx lint-staged`
- Staged rules in `package.json`:
  - `*.{ts,tsx,js,jsx}` -> `eslint --fix`, `prettier --write`
  - `*.{json,css,md}` -> `prettier --write`

## Dependencies
- `husky`
- `lint-staged`
- `eslint`
- `prettier`
- Node.js runtime with `npm`

## Runbook
1. Install dependencies:
```bash
npm install -D husky lint-staged eslint prettier
```
2. Initialize hooks:
```bash
npm run prepare
```
3. Ensure pre-commit hook calls lint-staged:
```bash
npx lint-staged
```
4. Validate by creating a test commit and verifying staged files are auto-linted and formatted.

## Expected Outcome
Every commit runs staged code-quality checks automatically before git records changes.
