const prettierConfig = require('./.prettierrc');

module.exports = {
  //I added @typescript-eslint in order to fix
  //Error: Definition for rule '@typescript-eslint/no-explicit-any' was not found.  @typescript-eslint/no-explicit-any
  parser: '@typescript-eslint/parser',
  extends: ['next/core-web-vitals', 'prettier'],
  plugins: ['prettier', 'simple-import-sort', '@typescript-eslint'],
  rules: {
    '@typescript-eslint/no-explicit-any': 'error',
    'import/no-anonymous-default-export': 'off',
    'prettier/prettier': ['error', prettierConfig], // apply rules from prettier config file
    'simple-import-sort/exports': 'error',
    'simple-import-sort/imports': 'error',
  },
};
