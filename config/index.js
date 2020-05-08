'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
    dev: {

        // Paths
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            // 接口地址:http://www.yingzaiqidian.cn/wxcode/login
            // 那么目录api里config的index.js的baseURL设置为'/api'
            // 那么浏览器看到的请求连接是http://0.0.0.0:8080/api/wxcode/login
            // /api只是作为一个识别符，如果有多个接口域名，baseURL不需要设置，统一在api目录下service.js里方法对应接口地址前加 识别符
            '/api': {
                target: 'http://0.0.0.0:5002/api/service/mock_data/index.php?m=wxcode&pid=43&url=',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' // 这里的意思就是把/api替换为'',如果接口带/api,就是写为'^/api':'/api'
                }
            },
            '/order': {
                target: 'http://yingzaiqidian.cn',
                changeOrigin: true,
                pathRewrite: {
                    '^/order': ''
                }
            }
        },

        // Various Dev Server settings
        host: '0.0.0.0', // can be overwritten by process.env.HOST
        port: 8080, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false, // https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

        // Use Eslint Loader?
        // If true, your code will be linted during bundling and
        // linting errors and warnings will be shown in the console.
        useEslint: true,
        // If true, eslint errors and warnings will also be shown in the error overlay
        // in the browser.
        showEslintErrorsInOverlay: false,

        /**
         * Source Maps
         */

        // https://webpack.js.org/configuration/devtool/#development
        devtool: 'cheap-module-eval-source-map',

        // If you have problems debugging vue-files in devtools,
        // set this to false - it *may* help
        // https://vue-loader.vuejs.org/en/options.html#cachebusting
        cacheBusting: true,

        cssSourceMap: true
    },

    build: {
        // Template for index.html
        index: path.resolve(__dirname, '../dist/index.html'),

        // Paths
        assetsRoot: path.resolve(__dirname, '../dist'),
        assetsSubDirectory: 'static',
        assetsPublicPath: './',

        /**
         * Source Maps
         */

        productionSourceMap: false,
        // https://webpack.js.org/configuration/devtool/#production
        devtool: '#source-map',

        // Gzip off by default as many popular static hosts such as
        // Surge or Netlify already gzip all static assets for you.
        // Before setting to `true`, make sure to:
        // npm install --save-dev compression-webpack-plugin
        productionGzip: false,
        productionGzipExtensions: ['js', 'css'],

        // Run the build command with an extra argument to
        // View the bundle analyzer report after build finishes:
        // `npm run build --report`
        // Set to `true` or `false` to always turn it on or off
        bundleAnalyzerReport: process.env.npm_config_report
    }
}