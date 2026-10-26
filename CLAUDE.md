@AGENTS.md

## Delegation

- Delegate repo searches to the `search` (structure) and `grep` (call sites) subagents, and checks and test runs to `audit`, to keep the main context small. Read a file directly only when you already know its path and need to edit it.
