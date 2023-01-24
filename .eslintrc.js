module.exports = {
    extends: '@antfu',
    plugins: ['unused-imports'],
    rules: {
        'no-extend-native': 'off',
        'unused-imports/no-unused-imports': 'error',
        '@typescript-eslint/comma-dangle': ['error', {
            generics: 'always', // 强制泛型尾部追加逗号
            objects: 'always-multiline',
        }],
        'antfu/if-newline': 'off',
        'eqeqeq': 'warn',
        '@typescript-eslint/no-use-before-define': 'off',
        '@typescript-eslint/prefer-ts-expect-error': 'off',
        '@typescript-eslint/ban-ts-comment': 'off',
        'no-console': 'off',
        'vue/html-indent': ['error', 4],
        '@typescript-eslint/semi': ['error', 'always'],
        '@typescript-eslint/indent': ['error', 4],
        'semi': ['error', 'always'],
        'prefer-promise-reject-errors': 'off',
        'no-debugger': 'warn',
        'no-restricted-syntax': 'off',
        '@typescript-eslint/brace-style': ['error', '1tbs'],
        'vue/max-attributes-per-line': ['error', {
            singleline: {
                max: 1,
            },
            multiline: {
                max: 1,
            },
        }],
    },
};
