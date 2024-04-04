module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      extends: "plugin:mdx/recommended",
      env: {
        node: true,
      },
      files: ["*.mdx", ".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],

  rules: {
    "react/prop-types": 0,
    "react/react-in-jsx-scope": 0,
    "@typescript-eslint/no-explicit-any": 0,
    "react/display-name": 0,
    "react/no-unescaped-entities": 0,
    "prefer-const": 0,
    "react/jsx-no-undef": 0,
  },
};
