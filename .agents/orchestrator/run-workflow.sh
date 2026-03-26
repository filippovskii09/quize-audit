#!/usr/bin/env bash
set -euo pipefail

if [[ $# -ne 1 ]]; then
  echo "Usage: $0 <workflow-id>" >&2
  exit 1
fi

workflow_id="$1"

case "$workflow_id" in
  pre-commit)
    ./.agents/orchestrator/run-skill.sh generic-git-hooks
    ;;
  quality-gate)
    ./.agents/orchestrator/run-agent.sh linter_bot
    ./.agents/orchestrator/run-agent.sh qa_engine
    ./.agents/orchestrator/run-agent.sh architect
    ;;
  ui-type-review)
    ./.agents/orchestrator/run-agent.sh senior-reviewer
    ;;
  *)
    echo "Unknown workflow id: $workflow_id" >&2
    exit 2
    ;;
esac
