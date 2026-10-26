@AGENTS.md

## Agent loop

The main session is the orchestrator. Size each task, then run its tier:

| Tier | When | Flow |
| --- | --- | --- |
| Tiny | One file, a few lines, no new behavior (copy, a value, a class) | Edit directly; the token hook checks each edit. |
| Standard | A focused change in known files | Edit directly, or use `implementer` when several files can proceed in parallel; confirm `pnpm check` passed. |
| Full | New interaction, state logic, motion, or a multi-file feature | Plan file in `~/.claude/plans/`, `implementer`s on disjoint files, `pnpm check`, `reviewer`, then findings back to `implementer` until the review is clean. |

- The main session runs on Sonnet with an Opus advisor (`advisorModel` in `.claude/settings.json`): consult the advisor before committing to an approach on a Full task and before declaring it done.
- Map unfamiliar code with `search`; brief straight from known file paths otherwise.
- Ask the user before building when a choice shapes the visual design. Review findings that would change the look go to the user as questions.
- Done when `pnpm check` passes and, for Full, the review is clean. The handoff names every skipped review, open finding, and that no browser check ran.

## Gotchas

- Scoped styles never reach reka-ui parts that render through a Teleport or fragment (Toast, Tooltip/Popper). Style them in an unscoped block with a unique class and a one-line comment. Dialog and Sheet content and overlay take scoped styles normally.
- `tw-animate-css` is not installed, so `animate-in`, `fade-*`, `zoom-*`, and `slide-*` classes emit nothing. Animate with `@keyframes` on `[data-state]` and the motion tokens; reka Presence waits for a CSS animation, never a transition.
- Most of `src/` is untracked: list changes with `git status --short`.
- The shell is zsh: quote globs and read exit codes with `; echo "exit=$?"`.
