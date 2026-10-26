#!/bin/sh
# PostToolUse hook: after an edit to app code, run the design token guard and
# report violations back to Claude (exit 2 feeds stderr into the conversation).
file=$(python3 -c 'import json,sys; print(json.load(sys.stdin).get("tool_input",{}).get("file_path",""))')
case "$file" in
  */src/*.vue|*/src/*.ts|*/src/*.css) ;;
  *) exit 0 ;;
esac
cd "$CLAUDE_PROJECT_DIR" || exit 0
out=$(node scripts/lint-tokens.mjs 2>&1) || { echo "$out" >&2; exit 2; }
exit 0
