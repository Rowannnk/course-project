import { createConfig } from "@platform/tooling/eslint"

export default [
  ...createConfig(import.meta.dirname),
  {
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
]
