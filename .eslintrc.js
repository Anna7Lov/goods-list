module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'linebreak-style': ["error", "windows"],
    'react/function-component-definition': ['off'],
    'import/prefer-default-export': ['off'],
    'react/require-default-props': ['off'],
    'prefer-destructuring': ['off'],
    'no-nested-ternary': ['off'],
    'default-param-last': ['off'],    
    "jsx-a11y/label-has-for": ["error", {
      "required": {
        "some": ["nesting", "id"]
      }
    }],
    'react/button-has-type': ['off'],
    'react/prefer-stateless-function': ['off'],
  },
};
