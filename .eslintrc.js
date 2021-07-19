const possibleErrors = {};

const bestPractices = {

};

const strict = {};

const variables = {};

const promises = {};

const es6 = {};

const react = {};

const stylistic = {
    'no-multiple-empty-lines': ['error', {max: 1, maxBOF: 0, maxEOF: 0}],
    'no-trailing-spaces': ['error', {skipBlankLines: false}],
    'comma-spacing': 'error',
    'comma-style': 'error',
    "react/no-unescaped-entities": 0,
    "react/prop-types": 0,
    "no-var": 0,
    semi: 'error',
    'keyword-spacing': ['error'],
    'space-in-parens':['error', 'never'],
    'space-infix-ops': 'error',
    'space-unary-ops': 'error',
    'wrap-regex': 'error'
};

const rules = Object.assign({},
    possibleErrors,
    bestPractices,
    strict,
    variables,
    promises,
    es6,
    react,
    stylistic);

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        ecmaFeatures: {
            ecmaVersion: es6,
            jsx: react,
            sourceType: 'module'
        }
    },
    env: {
        browser: true,
        commonjs: true,
        es6: es6,
        node: false
    },
    'extends': [
        'plugin:react/recommended'
    ],
    rules,
    overrides: [
        {
            files: [
                'src/**'
            ]
        }
    ]
};
