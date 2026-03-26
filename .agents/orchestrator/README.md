# Orchestrator

`orchestrator` contains executable entrypoints that bind atomic skills and role-based agents into repeatable workflows.

## Entry Points
- `run-skill.sh <skill-id>`: execute one skill recipe.
- `run-agent.sh <agent-id>`: execute checks owned by an agent.
- `run-workflow.sh <workflow-id>`: execute composed workflow pipelines.

## Manifests
- `skills-map.json`: links skill IDs to skill folders.
- `agents-map.json`: links agent IDs to owned skills and checks.

## Example
```bash
.agents/orchestrator/run-workflow.sh quality-gate
```
