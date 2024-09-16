module.exports = {
  env: {
    es6: true,
    browser: true,
    node: true,
  },
  files: ['src/**/*.{ts,tsx}'],
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  ignores: ['node_modules', 'dist'],
  rules: {
    'no-console': [
      'warn',
      {
        allow: ['error'],
      },
    ],
  },
};
