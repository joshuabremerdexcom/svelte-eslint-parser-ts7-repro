# svelte-eslint-parser picks wrong TypeScript in monorepo

- root: `typescript@7.0.2`
- `packages/app`: `typescript@6.0.3`, svelte-eslint-parser + typescript-eslint `projectService`
- `.svelte` file with plain JS `<script>`

```sh
pnpm install
cd packages/app
pnpm lint
```

Result:

```
App.svelte
  0:0  error  Parsing error: Cannot read properties of undefined (reading 'JavaScriptFile')
```

- 1.8.1: pass
- 1.9.0, 1.10.1: fail
- cause: `loadNewestModule("typescript")` in `src/parser/typescript/javascript.ts` picks TS 7 (newest reachable) over app's TS 6
