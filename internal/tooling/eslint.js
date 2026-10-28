import eslint from "@eslint/js"
import tseslint from "typescript-eslint"

export function createConfig(tsconfigRootDir) {
  return [
    { ignores: ["node_modules", "dist", ".nx"] },
    eslint.configs.recommended,
    ...tseslint.configs.recommendedTypeChecked,
    {
      files: ["**/*.ts"],
      languageOptions: {
        parserOptions: { projectService: true, tsconfigRootDir },
      },
    },
    { files: ["**/*.js"], ...tseslint.configs.disableTypeChecked },
  ]
}
