// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
    presets: [
        ['taro', {
            framework: 'vue3',
            ts: true,
        }],
        '@babel/preset-env',
    ],
    env: {
        test: {
            plugins: ['@babel/plugin-transform-modules-commonjs'],
        },
    },
    plugins: [
        [
            'import',
            {
                libraryName: '@nutui/nutui-taro',
                libraryDirectory: 'dist/packages/_es',
                // customName自定义兼容国际化使用
                customName: (name) => {
                    if (name === 'Locale')
                        return '@nutui/nutui-taro/dist/packages/locale/lang';
                    else
                        return `@nutui/nutui-taro/dist/packages/_es/${name}`;
                },
                style: name => `${name.toLowerCase().replace('_es/', '')}/index.scss`,
                camel2DashComponentName: false,
            },
            'nutui3-taro',
        ],
    ],
};
