/** @type {import("eslint").Linter.Config} */
module.exports = {
    parser: "@typescript-eslint/parser",
    extends: [
        "eslint:recommended",
        "plugin:@typescript-eslint/recommended",
        "prettier",
    ],
    plugins: ["@typescript-eslint"],
    env: {
        browser: true,
        node: true,
        es2022: true,
    },
    rules: {
        "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
        "@typescript-eslint/no-explicit-any": "warn",
        "no-console": ["warn", { allow: ["warn", "error"] }],
    },
    ignorePatterns: ["node_modules/", "dist/", ".next/", ".turbo/"],
};
