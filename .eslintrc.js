module.exports = {
    root: true,
    parser: '@typescript-eslint/parser',
    plugins: [
        '@typescript-eslint',
        'eslint-plugin-node',
        'eslint-plugin-import',
        'unused-imports'
    ],
    parserOptions: {
        ecmaFeatures: {
            ecmaVersion: 2020,
            jsx: {
                pragma: 'React',
                version: 'detect'
            },
            sourceType: 'module'
        }
    },
    env: {
        browser: true,
        commonjs: true,
        es6: {
            modules: true
        },
        node: false
    },
    extends: [
        'plugin:react/recommended',
        'plugin:tailwindcss/recommended'
    ],
    rules: {
        'indent': ['error', 4],
        'no-multiple-empty-lines': ['error', { max: 1, maxBOF: 0, maxEOF: 0 }],
        'no-trailing-spaces': ['error', { skipBlankLines: false }],
        'comma-spacing': 'error',
        'comma-style': 'error',
        'react/no-unknown-property': 0,
        'react/no-unescaped-entities': 0,
        'react/prop-types': 0,
        'react/jsx-curly-brace-presence': ['error', 'always'],
        'no-var': 0,
        'semi': 'error',
        'quotes': [2, 'single', 'avoid-escape'],
        'keyword-spacing': ['error'],
        'space-in-parens': ['error', 'never'],
        'space-infix-ops': 'error',
        'space-unary-ops': 'error',
        'object-curly-spacing': ['error', 'always'],
        'wrap-regex': 'error',
        'brace-style': [2, 'stroustrup', { allowSingleLine: true }],
        'tailwindcss/classnames-order': 'error',
        'react/react-in-jsx-scope': 'off',
        'import/order': [
            'error',
            {
                'groups': [
                    'builtin',
                    'external',
                    'internal',
                    'parent',
                    'sibling',
                    'index'
                ],
                'newlines-between': 'always',
                'alphabetize': {
                    'order': 'asc',
                    'caseInsensitive': true
                },
                'pathGroups': [
                    {
                        'pattern': 'react',
                        'group': 'external',
                        'position': 'before'
                    },
                    {
                        'pattern': '*.css',
                        'group': 'unknown',
                        'position': 'after'
                    }
                ],
                'pathGroupsExcludedImportTypes': ['builtin'],

            }
        ],
        'no-unused-vars': 'off', // or "@typescript-eslint/no-unused-vars": "off",
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': [
            'warn',
            { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }
        ],
        'tailwindcss/no-custom-classname': 'off'
    },
    overrides: [
        {
            files: [
                'src/**'
            ]
        }
    ]
};