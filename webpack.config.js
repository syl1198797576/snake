// 引入path模块
const path = require('path')
// 引入自动生成html模块
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 引入清空重新生成打包文件模块
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin')

// webpack所有配置信息应该写在module.exports中
module.exports = {

    mode: 'none',

    // 入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在的目录
    output: {
        // 指定打包文件的目录
        path: path.resolve(__dirname, 'dist'), // 等于 './dist'
        // 打包后文件的文件
        filename: "bundle.js",
        // 告诉webpack不使用箭头函数
        environment: {
            arrowFunction: false
        }
    },

    // 指定webpack打包时需要用的模块
    module: {
        // 指定要加载的规则
        rules: [{
                // test指定的是规则生效的文件
                test: /\.ts$/,
                // 使用ts-loader来加载文件
                use: [
                    // 加载的时候是从下向上加载的
                    // 第一个Babelloader 要配置
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置babel
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的浏览器
                                        targets: {
                                            "chrome": "99",
                                            "ie": "11"
                                        },

                                        // 指定corejs的版本
                                        "corejs": "3",
                                        // 使用corejs的加载方式  usage按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    // 第二个tsloader
                    "ts-loader"
                ],
                exclude: /node_modules/
            },

            // 设置less文件的处理
            {
                test: /\.less$/,
                use: [
                    // 1
                    "style-loader",
                    // 2
                    "css-loader",
                    // 3
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                // 使用插件
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        // 兼容的浏览器
                                        {
                                            // 所有浏览器最新的两个版本的
                                            browsers: 'last 2 versions'
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    // 4
                    "less-loader"
                ]
            }
        ]
    },

    // 配置webpack插件
    plugins: [
        new CleanWebpackPlugin(),
        // 在打包时自动生成html文件 
        new HtmlWebpackPlugin({
            title: '自定义title',
            template: './src/index.html'
        })
    ],

    // 用来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    }
}