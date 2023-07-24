const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    entry: './src/index.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'bundle.js',
        clean: true
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入postcss 
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        'postcss-preset-env',
                                        {
                                            browser: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ]
            },
            {
                test: /\.ts$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                [
                                    // 指定环境插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        targets: {
                                            'chrome': '88', // 兼容到chrome88
                                            'ie': '11'
                                        },
                                        "corejs": "3", // core-js的版本
                                        "useBuiltIns": "usage", // 使用core-js的方式usage表示按需加载
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'], // 先ts-loader再babel-loader
                exclude: /node_modules/
            }]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, 'src/index.html')
        })
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    mode: 'production'
}