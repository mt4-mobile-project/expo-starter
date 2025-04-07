// https://docs.expo.dev/guides/using-eslint/
module.exports = {
  extends: [
    'expo',
    'plugin:prettier/recommended', // ➕ ajoute Prettier
  ],
  plugins: ['prettier'],
  rules: {
    'prettier/prettier': 'error', // ➕ affiche une erreur si le format ne respecte pas prettier
  },
  ignorePatterns: ['/dist/*'],
};
