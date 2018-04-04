var webpack = require('webpack');
var CompressionPlugin = require('compression-webpack-plugin');
var DotENV = require('dotenv');

DotENV.config();
const publicUrl = process.env.DIST_DIR || 'dist';
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
    template: './public/templates/index.html',
    filename: 'index.html',
    inject: 'body'
});
const fs = require('fs-extra');
fs.emptyDir(`./public/${publicUrl}`);

let plugins = [
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
        }
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
    new CompressionPlugin({
        asset: "[path].gz[query]",
        algorithm: "gzip",
        test: /\.js$|\.css$|\.html$/,
        threshold: 10240,
        minRatio: 0.8
    }),
    HtmlWebpackPluginConfig
];

if (process.env.NODE_ENV === 'production') {
    plugins.push(new webpack.optimize.UglifyJsPlugin());
}

module.exports = {
    entry: [
        './public/src/index.js'
    ],
    output: {
        path: __dirname + `/public/${publicUrl}/`,
        publicPath: `/${publicUrl}/`,
        filename: '[hash].bundle.js',
        chunkFilename: "[id].[hash].bundle.js"
    },
    devtool: "source-map",
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.css$/, loaders: [ 'style-loader', 'css-loader'] },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=1024000' }
        ]
    },
    plugins: plugins,

    resolve: {
        extensions: ['.js', '.jsx'],
        "alias": {
            "react": "preact-compat",
            "react-dom": "preact-compat"
        }
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './public',
        disableHostCheck: true
    }
};