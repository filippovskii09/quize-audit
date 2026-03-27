# Agentic Workflow: Детальний розбір `.agents`

## 1. Що це за система

У проєкті `.agents` — це локальний runtime-шар для керованої розробки:
- `skills` задають стандарти/рецепти (що робити і як перевіряти).
- `agents` задають ролі (хто за що відповідає).
- `orchestrator` запускає це як автоматизовані ланцюжки (`skill -> agent -> workflow`).

Простіше: **skill = правила + інструкції**, **agent = відповідальність**, **orchestrator = виконання команд**.

---

## 2. Загальна схема роботи

1. Ти обираєш рівень запуску:
- одиночний скіл (`run-skill.sh`)
- одиночний агент (`run-agent.sh`)
- повний workflow (`run-workflow.sh`)

2. Оркестратор виконує shell-команди, описані в `case`-блоках.

3. `agents-map.json` і `skills-map.json` дають зв'язок між логічними ID та фізичними файлами/папками.

4. Якість контролюється через стандартні інструменти проєкту: `eslint`, `jest`, `vite build`, `lint-staged`.

---

## 3. Розбір по папках

### `.agents/rules.md`
Глобальні обмеження поведінки агентів:
- заборона ризикових git-операцій без явного підтвердження користувача;
- заборона destructive-команд (`reset --hard`, `push --force`, `clean -fd`);
- вимога зупинятись при підозрі на небезпечний стан дерева.

Це policy-рівень безпосередньо для безпеки процесу.

### `.agents/agents/`
Людино-читані профілі ролей (хто що перевіряє і які команди виконує).

### `.agents/skills/`
База знань і рецептів:
- `SKILL.md` — правила, критерії, практики.
- `recipe.json` — машинно-читані короткі конфігурації/команди (є не у всіх скілів).

### `.agents/orchestrator/`
Виконувана частина системи:
- shell entrypoints;
- json-мапи;
- композиція workflow-ланцюжків.

---

## 4. Розбір кожного файлу

## 4.1 `.agents/agents`

### `.agents/agents/.gitkeep`
Технічний файл для збереження папки в git, коли вона порожня.

### `.agents/agents/architect.md`
Роль Architect:
- контролює архітектуру фронтенду (структура компонентів, alias-імпорти, модульні контракти);
- зона: `src/components/**`, `src/constants/**`, `tsconfig.app.json`, `vite.config.ts`;
- команди: `npm run lint`, `npm run build`.

### `.agents/agents/linter_bot.md`
Роль Linter_Bot:
- відповідає за статичний аналіз/форматування/hook-пайплайн;
- зона: `eslint.config.js`, `.prettierrc`, `.husky/pre-commit`, `package.json`;
- команди: `npm run lint`, `npm run lint:fix`, `npx lint-staged`.

### `.agents/agents/qa_engine.md`
Роль QA_Engine:
- відповідає за стабільність тестів і регресії;
- зона: тести, `src/hooks/**`, `jest.config.ts`, `src/setupTest.tsx`;
- команда: `npm test`.

### `.agents/agents/senior-reviewer.md`
Роль Senior-Reviewer:
- фокус на `src/components/ui` і type safety;
- перевіряє контракти в `types.ts`, `import type`, відсутність `any`, коректність barrel-export;
- команди: `npm run lint`, `npm run build`, `npm test -- --runInBand src/components/ui`.

## 4.2 `.agents/orchestrator`

### `.agents/orchestrator/.gitkeep`
Технічний файл для git-збереження папки.

### `.agents/orchestrator/README.md`
Коротка інструкція, що є 3 точки входу:
- `run-skill.sh`
- `run-agent.sh`
- `run-workflow.sh`

### `.agents/orchestrator/skills-map.json`
Мапа `skill-id -> шлях до скіла`.
Потрібна для прозорості й потенційної автоматизації (інструменти можуть швидко знайти джерело правил).

### `.agents/orchestrator/agents-map.json`
Мапа `agent-id -> markdown-опис + зв'язані skill-id`.
Це декларація того, які скіли підтримують кожного агента.

### `.agents/orchestrator/run-skill.sh`
Запускає один скіл за ID.
Приклади:
- `generic-git-hooks` -> `npx lint-staged`
- `eslint-config-recipe` -> `npm run lint`
- `jest-setup-recipe` -> `npm test`

### `.agents/orchestrator/run-agent.sh`
Запускає одну роль агента за ID:
- `architect`, `qa_engine`, `linter_bot`, `senior-reviewer`.

### `.agents/orchestrator/run-workflow.sh`
Композиція кількох запусків:
- `pre-commit` -> skill `generic-git-hooks`
- `quality-gate` -> `linter_bot` -> `qa_engine` -> `architect`
- `ui-type-review` -> `senior-reviewer`

## 4.3 `.agents/skills`

### `.agents/skills/frontend-architecture/SKILL.md`
Правила архітектури UI-компонентів:
- структура папок (`index.tsx`, `types.ts`),
- alias-політика,
- barrel-exports,
- правила для тестів іконок/констант.

### `.agents/skills/frontend-testing/SKILL.md`
Стандарти тестування:
- RTL query strategy,
- behavior-first,
- правила моків,
- стабільність тестів,
- практики для hook/Provider-тестів.

### `.agents/skills/frontend-testing-setup/SKILL.md`
Покроковий setup тестового середовища:
- централізований `setupTest.tsx`,
- alias `@setupTest`,
- базова конфігурація Jest + RTL.

### `.agents/skills/import-standards/SKILL.md`
Правила імпортів:
- порядок груп,
- сортування,
- `import type`,
- alias vs relative,
- blank-line discipline.

### `.agents/skills/i18n-standards/SKILL.md`
Guidelines для `react-intl`:
- `messages.ts` підхід,
- `FormattedMessage`/`useIntl`,
- pluralization,
- структура i18n-конфігу.

### `.agents/skills/generic-git-hooks/SKILL.md`
### `.agents/skills/generic-git-hooks/recipe.json`
Рецепт pre-commit automation (husky + lint-staged), залежності і команди bootstrap/validate.

### `.agents/skills/eslint-config-recipe/SKILL.md`
### `.agents/skills/eslint-config-recipe/recipe.json`
Type-aware ESLint-рецепт: key rules, залежності, lint/lint:fix команда.

### `.agents/skills/prettier-config-recipe/SKILL.md`
### `.agents/skills/prettier-config-recipe/recipe.json`
Рецепт форматування (`.prettierrc`) і команди запуску.

### `.agents/skills/jest-setup-recipe/SKILL.md`
### `.agents/skills/jest-setup-recipe/recipe.json`
Рецепт тестового runtime (ts-jest ESM + jsdom + aliases).

### `.agents/skills/skill-i18n-setup/SKILL.md`
### `.agents/skills/skill-i18n-setup/recipe.json`
Domain-skill для i18n runtime:
- provider/context/hooks/locales,
- перевірки локалей і message IDs.

### `.agents/skills/skill-hooks-library/SKILL.md`
### `.agents/skills/skill-hooks-library/recipe.json`
Domain-skill для shared hooks:
- правила типізації,
- barrel-export,
- тестування hooks.

---

## 5. Як цим користуватися (практика)

## 5.1 Запуск конкретного скіла

```bash
./.agents/orchestrator/run-skill.sh eslint-config-recipe
./.agents/orchestrator/run-skill.sh generic-git-hooks
```

Коли використовувати:
- коли потрібна одна конкретна операція (тільки lint, тільки hooks, тільки tests).

## 5.2 Запуск конкретного агента

```bash
./.agents/orchestrator/run-agent.sh senior-reviewer
./.agents/orchestrator/run-agent.sh qa_engine
```

Коли використовувати:
- коли потрібна перевірка в межах ролі (UI-review, QA-review).

## 5.3 Запуск готового workflow

```bash
./.agents/orchestrator/run-workflow.sh pre-commit
./.agents/orchestrator/run-workflow.sh quality-gate
./.agents/orchestrator/run-workflow.sh ui-type-review
```

Коли використовувати:
- перед merge;
- після великого рефактору;
- перед code review.

---

## 6. Типові сценарії

## Сценарій A: додав новий UI-компонент
1. Застосувати `frontend-architecture` (структура + types).
2. Написати тести за `frontend-testing`.
3. Запустити `ui-type-review`.

```bash
./.agents/orchestrator/run-workflow.sh ui-type-review
```

## Сценарій B: хочеш швидко перевірити pre-commit пайплайн

```bash
./.agents/orchestrator/run-skill.sh generic-git-hooks
```

## Сценарій C: повний quality gate перед PR

```bash
./.agents/orchestrator/run-workflow.sh quality-gate
```

---

## 7. Що можна покращити далі

1. Додати workflow `ui-audit-refactor` як окремий case у `run-workflow.sh`.
2. Додати `agents/openai.yaml` для кожного локального скіла (краща інтеграція метаданих).
3. Уніфікувати testing entrypoint (`@setupTest` vs можливий `@src/test-utils`) і зафіксувати це окремим skill.
4. Додати `--dry-run` режим в orchestrator-скрипти для безпечного preview.

---

## 8. Короткий cheatsheet

```bash
# Один скіл
./.agents/orchestrator/run-skill.sh <skill-id>

# Один агент
./.agents/orchestrator/run-agent.sh <agent-id>

# Готовий ланцюг
./.agents/orchestrator/run-workflow.sh <workflow-id>
```

Доступні `workflow-id` зараз:
- `pre-commit`
- `quality-gate`
- `ui-type-review`

Доступні `agent-id` зараз:
- `architect`
- `qa_engine`
- `linter_bot`
- `senior-reviewer`
