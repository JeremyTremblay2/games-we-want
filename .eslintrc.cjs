module.exports = {
  root: true,
  env: { browser: true, es2020: true, jest: true },
  extends: [
    "eslint:recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "plugin:react-hooks/recommended",
    "prettier",
    "plugin:prettier/recommended",
  ],
  ignorePatterns: ["dist", ".eslintrc.cjs"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  settings: { react: { version: "18.2" } },
  plugins: ["react-refresh", "prettier"],
  globals: {
    vi: true,
  },
  rules: {
    "no-unused-vars": "off",
    "react/no-unescaped-entities": "off",
    "react/jsx-no-target-blank": "off",
    "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
    "react/jsx-first-prop-new-line": [2, "multiline"],
    "react/jsx-max-props-per-line": [2, { maximum: 1, when: "multiline" }],
    "react/jsx-indent-props": [2, 2],
    "react/jsx-closing-bracket-location": [2, "tag-aligned"],
  },
}
