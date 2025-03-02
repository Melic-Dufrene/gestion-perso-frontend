module.exports = {
    root: true,
    env: {
      node: true,
      browser: true
    },
    extends: [
      'plugin:vue/vue3-recommended',
      'eslint:recommended',
      // any other extends you might have...
    ],
    parser: 'vue-eslint-parser',
    parserOptions: {
      parser: '@babel/eslint-parser',
      ecmaVersion: 2020,
      sourceType: 'module'
    },
    plugins: ['vue'],
    rules: {
      'vue/script-setup-uses-vars': 'error',
      'no-used-vars':'off',
      // other custom rules...
    },
    overrides: [
      {
        files: ['*.vue'],
        rules: {
          'no-unused-vars': 'off'
        }
      }
    ]
  };