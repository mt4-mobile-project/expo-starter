// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'expo',
    'plugin:prettier/recommended', // ➕ ajoute Prettier
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  plugins: ['prettier', 'import'],
  rules: {
    'prettier/prettier': 'error', // ➕ affiche une erreur si le format ne respecte pas prettier
    'import/no-unresolved': 'error',
  },
  ignorePatterns: ['/dist/*'],
  settings: {
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      typescript: {
        alwaysTryTypes: true,
        project: '/Users/vicoh/Documents/projects/nunu-mobile-app/mobile/tsconfig.json',
      },
      'babel-module': {
        alias: {
          '@': './src',
        },
      },
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
};
