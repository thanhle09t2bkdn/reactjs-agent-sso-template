module.exports = {
    entry: [
        './public/src/index.js'
    ],
    output: {
        path: __dirname + '/public/client/',
        publicPath: '/',
        filename: 'bundle.js'
    },
    devtool: "eval",
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.less$/, loaders: [ 'style-loader', 'css-loader', 'less-loader' ] },
            { test: /\.css$/, loaders: [ 'style-loader', 'css-loader'] },
            { test: /\.(png|woff|woff2|eot|ttf|svg|gif)$/, loader: 'url-loader?limit=1024000' }
        ]
    },
    devServer: {
        historyApiFallback: true,
        contentBase: './public/client'
    }
};