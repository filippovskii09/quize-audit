#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <skill-id>" >&2
  exit 1
fi

skill_id="$1"

case "$skill_id" in
  generic-git-hooks)
    npx lint-staged
    ;;
  eslint-config-recipe)
    npm run lint
    ;;
  prettier-config-recipe)
    npx prettier --write .
    ;;
  jest-setup-recipe)
    npm test
    ;;
  skill-i18n-setup)
    npm test -- --runInBand src/i18n
    ;;
  skill-hooks-library)
    npm test -- --runInBand src/hooks
    ;;
  *)
    echo "Unknown skill id: $skill_id" >&2
    exit 2
    ;;
esac
