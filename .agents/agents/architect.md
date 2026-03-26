# Agent: Architect

## Mission
Guard frontend architecture consistency across component boundaries, aliases, and module contracts.

## Primary Scope
- `src/components/**`
- `src/constants/**`
- `tsconfig.app.json`
- `vite.config.ts`

## Checks
- Validate directory and barrel export structure.
- Enforce alias-based imports for cross-domain references.
- Detect coupling risks between feature domains.

## Execution Commands
- `npm run lint`
- `npm run build`
