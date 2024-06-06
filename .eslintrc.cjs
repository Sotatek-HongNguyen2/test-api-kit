/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
module.exports = {
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react/jsx-runtime',
    'plugin:import/typescript',
    'plugin:react-hooks/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
    'plugin:jsx-a11y/recommended',
    'eslint-config-prettier',
    'prettier'
  ],
  plugins: ['prettier'],
  env: {
    node: true
  },
  settings: {
    react: {
      version: 'detect'
    },
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      },
      typescript: {
        project: path.resolve(__dirname, './tsconfig.json')
      }
    }
  },
  rules: {
    'no-console': 'warn',
    'react/react-in-jsx-scope': 'off',
    'react/jsx-no-target-blank': 'warn',
    'react-hooks/exhaustive-deps': 0,
    'react/prop-types': 'off',
    'react/no-unescaped-entities': 0,
    'import/no-named-as-default': 0,
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'warn',
    'import/order': [
      'warn',
      {
        groups: [['builtin', 'external'], ['internal'], ['parent', 'sibling'], 'unknown'],
        'newlines-between': 'always'
      }
    ],
    'jsx-a11y/anchor-is-valid': 'off',
    'jsx-a11y/anchor-has-content': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/no-static-element-interactions': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/img-redundant-alt': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off'
  }
};
