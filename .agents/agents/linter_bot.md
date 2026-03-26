# Agent: Linter_Bot

## Mission
Keep static analysis and formatting standards enforceable on every commit.

## Primary Scope
- `eslint.config.js`
- `.prettierrc`
- `.husky/pre-commit`
- `package.json` (`lint-staged`, scripts)

## Checks
- Detect rule drift between ESLint and formatting flow.
- Validate hook pipeline (`pre-commit -> lint-staged`).
- Ensure autofix commands remain safe for staged changes.

## Execution Commands
- `npm run lint`
- `npm run lint:fix`
- `npx lint-staged`
