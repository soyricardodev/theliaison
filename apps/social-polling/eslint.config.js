import baseConfig, { restrictEnvAccess } from "@theliaison/eslint-config/base";
import nextjsConfig from "@theliaison/eslint-config/nextjs";
import reactConfig from "@theliaison/eslint-config/react";

/** @type {import('typescript-eslint').Config} */
export default [
  {
    ignores: [".next/**"],
  },
  ...baseConfig,
  ...reactConfig,
  ...nextjsConfig,
  ...restrictEnvAccess,
];