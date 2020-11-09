module.exports = {
  extends: [require.resolve('@umijs/fabric/dist/eslint')],
  rules: {
    'comma-dangle': ['error', 'always-multiline'],
    'jsx-quotes': [2, 'prefer-double'],
    quotes: ['error', 'single'],
  },
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
    REACT_APP_ENV: true,
  },
};
