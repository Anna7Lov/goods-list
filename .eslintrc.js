module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:@typescript-eslint/recommended',
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
    '@typescript-eslint',
  ],
  rules: {
    'linebreak-style': ["error", "windows"],
    'react/function-component-definition': ['off'],
    'import/prefer-default-export': ['off'],
    'react/require-default-props': ['off'],
    'prefer-destructuring': ['off'],
    'no-nested-ternary': ['off'],
    'default-param-last': ['off'],    
    'no-shadow': ['off'],
    '@typescript-eslint/no-non-null-assertion': ['off'],
    'object-shorthand': ['off'],
    'jsx-a11y/label-has-for': ['error', {
      'required': {
        'some': ['nesting', 'id']
      }
    }],
    'react/button-has-type': ['off'],
    'react/jsx-filename-extension': [1, {
      extensions: ['.jsx', '.tsx'],
    }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
      },
    ],    
  },
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        'no-undef': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
}
