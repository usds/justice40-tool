module.exports = {
    'env': {
        'browser': true,
        'es2021': true,
        'node': true,
    },
    'extends': [
        'plugin:react/recommended',
        'plugin:cypress/recommended',
        'google',
    ],
    'parser': '@typescript-eslint/parser',
    'parserOptions': {
        'ecmaFeatures': {
            'jsx': true,
        },
        'ecmaVersion': 12,
        'sourceType': 'module',
    },
    'plugins': [
        'react',
        '@typescript-eslint',
        'formatjs',
    ],
    'rules': {
        'max-len': [2, { 'code': 120, 'tabWidth': 4, 'ignoreUrls': true }],
        'formatjs/no-offset': 'error',
        'formatjs/enforce-description': 'error',
        'formatjs/enforce-default-message': 'error',
        'formatjs/enforce-placeholders': 'error',
    },
    'settings': {
        'react': {
            'version': 'detect',
        },
    },
};