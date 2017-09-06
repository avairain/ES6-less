var path = require('path')
var htmlWebpackPlugin = require('html-webpack-plugin')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var webpack = require('webpack')
var ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextWebpackPlugin('css/[name]-one.css');
const extractLESS = new ExtractTextWebpackPlugin('css/[name].css');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'js/bundle.js'
    },
    module: {
        rules: [
            { test: /\.js$/, use: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, use: ['style-loader', 'css-loader'] },
            { test: /\.scss/, use: ['style-loader', 'css-loader', 'sass-loader'] },
            { test: /\.(jpg|gif|png|bmp)$/, use: 'url-loader?limit=1024&name=images/[hash:7]-[name].[ext]'},
            {
                test: /\.less$/,
                use: extractLESS.extract({use:['css-loader', 'less-loader'],publicPath:'../'}),
                
            },
        ]
    },
    plugins: [
        extractCSS,
        extractLESS,
        new htmlWebpackPlugin({
            template: "html-withimg-loader!"+path.join(__dirname, "./src/jsp/index.html"),//模版
            filename: "jsp/index.html", //文件名
            minify: {
                collapseWhitespace: true, // 合并空白字符
                removeComments: true, // 移除注释
                removeAttributeQuotes: true // 移除属性上的引号
            }

        }),
        new webpack.optimize.UglifyJsPlugin({
            commpress:{
                warnings:false  //移除警告
            }
        }),
        //压缩js
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"production"'  //进一步压缩JS 但效果不明显
        }),
        new CleanWebpackPlugin(['dist']),

        new ExtractTextWebpackPlugin('css/styles.css')
    ]
    /*分离第三方包
    entry:{
        app:path.join(__dirname,'./src/main.js'),
        vendors:['']  //第三方包的名字
    }
    pluguns:[
        new webpack.optimize.CommonsChunkPlugin({
            name:'vendors',
            filename:''//分离后第三方包的名字
        }),
        //压缩JS
        new webpack.optimize.UglifyJsPlugin({
            commpress:{
                warning:false     //移除警告
            }
        }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV':'"production"'  //进一步压缩JS 但效果不明显
        })
    ]
     分离css
    # npm i -D extract-text-webpack-plugin
    var ExtractTextWebpackPlugin=require('extract-text-webpack-plugin')
    module:{
        rules:[
            {test:/\.css#/,use:ExtractTextWebpackPlugin.extract({
                fallback:'style-loader',
                use:'css-loader',
                publicPath:'../'   //公共路径
            })},
            {test:/\.scss#/,use:ExtractTextWebpackPlugin.extract({
                fallback:'style-loader',
                use:['css-loader','scss-loader],
                publicPath:'../'   //公共路径
            })}

        ]
    },
    plugins:[
        new ExtractTextWebpackPlugin('css/styles.css') // 分离css的路径
    ]
    压缩分离的css
    # npm i optimize-css-assets-webpack-plugin -D
    var OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin')
    plugins:[
        new OptimizeCssAssetsWebpackPlugin()
    ]
    less 
    # npm i less-loader less -D 
    module:{
        rules:[
            {test:/\.less$/,use:[
                {loader:'style-loader'},
                {loader:'css-loader'},
                {loader:'less-loader'},
            ]
        ]
    }
    */
}