const path = require('path');

const env = process.env.TARO_ENV; // 编译时环境

const designWidth = (input) => {
    const isNutUi = input.file.replace(/\\+/g, '/').includes('@nutui/nutui-taro');
    return isNutUi ? 375 : 750;
};

const config = {
    compiler: {
        type: 'webpack5',
        // 仅 webpack5 支持依赖预编译配置
        prebundle: {
            enable: true,
            esbuild: {
                logOverride: { 'this-is-undefined-in-esm': 'silent' },
            },
        },
    },
    alias: {
        '@': path.resolve(__dirname, '..', 'src'),
    },
    projectName: 'ts-template',
    date: '2022-8-24',
    designWidth: 750,
    deviceRatio: {
        640: 2.34 / 2,
        750: 1,
        828: 1.81 / 2,
        375: 2 / 1,
    },
    sourceRoot: 'src',
    outputRoot: `dist/${env}`,
    plugins: ['@tarojs/plugin-html'],
    defineConstants: {},
    copy: {
        patterns: [],
        options: {},
    },
    framework: 'vue3',
    sass: {
        data: `
        @import "@nutui/nutui-taro/dist/styles/variables-jdt.scss";
        @import "@/assets/styles/mixins.scss";
        `,
    },
    mini: {
        imageUrlLoaderOption: {
            limit: 1024,
        },
        webpackChain(chain) {
            chain.merge({
                module: {
                    rule: [
                        {
                            test: /.js$/,
                            loader: 'babel-loader',
                        }
                    ],
                },
            });
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {
                    designWidth,
                },
            },
            url: {
                enable: true,
                config: {
                    limit: 1024, // 设定转换尺寸上限
                },
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[local]-[hash:base64:8]',
                },
            },
        },
    },
    h5: {
        esnextModules: ['nutui-taro'],
        publicPath: '/',
        staticDirectory: 'static',
        imageUrlLoaderOption: {
            limit: 1024,
        },
        postcss: {
            pxtransform: {
                enable: true,
                config: {
                    designWidth,
                },
            },
            autoprefixer: {
                enable: true,
                config: {},
            },
            cssModules: {
                enable: true, // 默认为 false，如需使用 css modules 功能，则设为 true
                config: {
                    namingPattern: 'module', // 转换模式，取值为 global/module
                    generateScopedName: '[local]-[hash:base64:8]',
                },
            },
        },
    },
};

module.exports = function (merge) {
    if (process.env.NODE_ENV === 'development')
        return merge({}, config, require('./dev'));

    return merge({}, config, require('./prod'));
};
