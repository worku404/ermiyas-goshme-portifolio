import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import jsxA11y from "eslint-plugin-jsx-a11y";

/**
 * ESLint Flat Config for Next.js 16 + TypeScript + JSX-A11y.
 *
 * Rationale:
 * - eslint-config-next automatically registers the 'jsx-a11y' plugin and Next.js vital rules.
 * - In ESLint 9, re-registering the plugin in a separate block causes "Cannot redefine plugin".
 * - By merging jsxA11y.flatConfigs.recommended.rules directly, we upgrade the default warnings
 *   to strict errors (alt text, ARIA attributes, keyboard traps) safeguarding WCAG 2.1 AA.
 */
const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    rules: {
      ...jsxA11y.flatConfigs.recommended.rules,
    },
  },
  globalIgnores([".next/**", "out/**", "build/**", "next-env.d.ts"]),
]);

export default eslintConfig;
