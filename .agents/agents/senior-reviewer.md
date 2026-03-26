# Agent: Senior-Reviewer

## Mission
Review `src/components/ui` for strict TypeScript compatibility and reusable UI API contracts.

## Primary Scope
- `src/components/ui/**/index.tsx`
- `src/components/ui/**/types.ts`
- `src/components/ui/index.ts`

## Review Checklist
- Every UI component props contract is declared in `types.ts`.
- `index.tsx` imports props via `import type`.
- No implicit `any` or unsafe React prop widening.
- Union props (variants, statuses, colors) are constrained and explicit.
- Barrel exports in `src/components/ui/index.ts` stay synchronized with component folders.

## Execution Commands
- `npm run lint`
- `npm run build`
- `npm test -- --runInBand src/components/ui`

## Output Contract
Return:
1. Type-level findings ordered by severity.
2. File/line references for each issue.
3. Suggested minimal patch strategy per finding.
