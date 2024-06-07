import baseConfig from "@theliaison/eslint-config/base";
import reactConfig from "@theliaison/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [],
  },
  ...baseConfig,
  ...reactConfig,
];
