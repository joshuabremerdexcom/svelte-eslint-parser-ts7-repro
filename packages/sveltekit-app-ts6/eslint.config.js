import tseslint from "typescript-eslint";
import svelte from "eslint-plugin-svelte";

export default [
  ...svelte.configs.recommended,
  {
    files: ["**/*.svelte"],
    languageOptions: {
      parserOptions: {
        parser: tseslint.parser,
        projectService: true,
        extraFileExtensions: [".svelte"],
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
];
