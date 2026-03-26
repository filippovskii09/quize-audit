#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <agent-id>" >&2
  exit 1
fi

agent_id="$1"

case "$agent_id" in
  architect)
    npm run lint
    npm run build
    ;;
  qa_engine)
    npm test
    ;;
  linter_bot)
    npm run lint
    npx lint-staged
    ;;
  senior-reviewer)
    npm run lint
    npm run build
    npm test -- --runInBand src/components/ui
    ;;
  *)
    echo "Unknown agent id: $agent_id" >&2
    exit 2
    ;;
esac
