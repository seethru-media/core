/** @type {import("eslint").Linter.Config} */
module.exports = {
    root: true,
    extends: ["@seethru/config/eslint-preset"],
    parserOptions: {
        tsconfigRootDir: __dirname,
    },
    ignorePatterns: ["node_modules/", "dist/", ".next/", ".turbo/"],
};
