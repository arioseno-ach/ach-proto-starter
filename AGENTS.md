# Project guidance

- Put reusable UI primitives in `src/components/ui` and composed application components in `src/components`.
- Keep reference pages in `src/examples` and design-system documentation in `docs/design-system`.
- Define design tokens in `src/styles/tokens.css` and document them in `docs/design-system/tokens.md`.
- Use the `@/` alias for imports from `src`.
- Use `cn()` from `src/lib/utils.ts` to merge conditional Tailwind classes.
- Keep shared component variants consistent with the design-system documentation.

## Commands

- `pnpm dev` starts the Vite development server.
- `pnpm lint` runs Oxlint.
- `pnpm typecheck` runs `tsc -b`.
- `pnpm build` runs the TypeScript build and Vite production build.
