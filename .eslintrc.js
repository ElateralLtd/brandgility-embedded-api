const getResolve = require('./webpack.resolve');

module.exports = {
  "parser": "babel-eslint",
  "parserOptions": {
    "sourceType": "module",
    "ecmaVersion": 2018,
  },
  "extends": [
    "eslint:recommended",
    "plugin:import/errors",
    "plugin:jest/recommended",
    "plugin:unicorn/recommended",
    "eslint-config-airbnb-base",
  ],
  "plugins": [
    "eslint-plugin-import",
    "eslint-plugin-jest",
    "eslint-plugin-unicorn",
  ],
  "env": {
    "es6": true,
    "jest": true,
    "browser": true,
  },
  "settings": {
    "import/resolver": {
      "webpack": {
        "config": {
          "resolve": getResolve(),
        },
      },
    },
  },
  "rules": {
    "operator-linebreak": [ "error", "after" ],
    "space-before-blocks": "error",
    "keyword-spacing": "error",
    "no-confusing-arrow": [ "error", { "allowParens": true } ],
    "no-console": [ "warn", { "allow": [ "warn", "error", "info" ] } ],
    "no-debugger": "warn",
    "no-else-return": "off",
    "no-multiple-empty-lines": "error",
    "no-nested-ternary": "off",
    "no-negated-condition": "error",
    "no-underscore-dangle": "error",
    "no-unused-expressions": [ "error", {
      "allowShortCircuit": true,
      "allowTernary": true,
    } ],
    "max-len": [ "error", {
      "code": 100,
      "tabWidth": 2,
      "ignoreUrls": true,
      "ignoreStrings": true,
      "ignoreRegExpLiterals": true,
    } ],
    "arrow-parens": [ "error", "always" ],
    "arrow-spacing": [ "error", { "before": true, "after": true }],
    "semi": "error",
    "eol-last": [ "error", "always" ],
    "quotes": [ "error", "single" ],
    "quote-props": [ "error", "consistent-as-needed" ],
    "require-atomic-updates": "error",
    "object-curly-spacing": [ "error", "always" ],
    "object-curly-newline": [ "error", { "consistent": true } ],
    "padding-line-between-statements": [ "error",
      { "blankLine": "always", prev: "*", next: "return" },
      { "blankLine": "always", prev: [ "const", "let", "var" ], next: "*" },
      { "blankLine": "any", prev: [ "const", "let", "var" ], next: [ "const", "let", "var" ] },
    ],
    "array-bracket-spacing": [ "error", "never" ],
    "array-bracket-newline": [ "error", "consistent" ],

    "import/first": "error",
    "import/no-anonymous-default-export": "error",
    "import/no-cycle": "error",
    "import/no-extraneous-dependencies": [ "error", { "devDependencies": [ "**/*.test.js", "**/stories.js" ] } ],
    "import/no-useless-path-segments": "error",
    "import/order": [ "error", {
      "groups": [
        [ "builtin", "external" ],
        [ "internal" ],
        [ "parent", "sibling", "index" ],
      ],
      "newlines-between": "always",
    } ],
    "import/prefer-default-export": "off",

    "jest/expect-expect": "error",
    "jest/prefer-strict-equal": "error",
    "jest/prefer-to-be-null": "error",
    "jest/prefer-to-be-undefined": "error",

    "unicorn/prevent-abbreviations": "off",
  },
};
