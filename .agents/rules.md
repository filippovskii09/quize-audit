# 📋 Agent Behavior Guidelines (Rules)

These rules are global for any AI assistant or subagent interacting with this project workspace. **Violations of these rules are strictly prohibited.**

---

## 🚫 1. Git & Version Control Operations
- **PROHIBITED** to automatically execute any `git` command modifying index/tree (`git add`, `git commit`, `git branch`, `git merge`, `git checkout`, `git stash`, etc.) without explicit User dialogue approval.
- **PROHIBITED** to build automated push or local workspace tree branches sequences committing sequentially unless the User provides direct authorization of the stack outline first.
- **ALLOWED** to suggest paths forward, generate bash-script fragments, or generate `.sh` outlines. Full execution flows are reserved ONLY to User-driven confirmation statements.

---

## ⚠️ 2. High-Risk Workspace Actions
- **PROHIBITED** to run destructive reset actions: `git reset --hard`, `git push --force`, `git clean -fd`.
- If unexpected local tree discrepancies are found, the Agent **MUST halt** and report the diff context to the user before editing code further to prevent workspace corruption.
