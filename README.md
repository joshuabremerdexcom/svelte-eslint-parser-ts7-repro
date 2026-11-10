# svelte-eslint-parser picks wrong TypeScript in monorepo

- `packages/sveltekit-app-ts6`: `typescript@6.0.3`, svelte-eslint-parser + typescript-eslint `projectService`
- `packages/microservice-ts7`: `typescript@7.0.2`
- `.svelte` file with plain JS `<script>`

```sh
pnpm install
cd packages/sveltekit-app-ts6
pnpm lint
```

Result:

```
App.svelte
  0:0  error  Parsing error: Cannot read properties of undefined (reading 'JavaScriptFile')
```

- 1.8.1: pass
- CI: see Actions tab (matrix 1.8.1 / 1.9.0 / 1.10.1)
- 1.9.0, 1.10.1: fail
- cause: `loadNewestModule("typescript")` in `src/parser/typescript/javascript.ts` picks TS 7 (newest reachable via eslint's hoisted deps) over app's TS 6
- note: pnpm hoists TS from first package alphabetically. rename `microservice-ts7` -> `z-microservice-ts7` and it passes. fragile.
