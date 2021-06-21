const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'development',
    entry: './app.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, './build'),
        publicPath: './build/'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [
                    {
                        loader: 'style-loader', // creates style nodes from JS strings
                    },
                    {
                        loader: 'css-loader',
                    },
                    {
                        loader: 'sass-loader'
                    }
                ]
            },
            {
                test: /\.css/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader',
                    }
                ]
            },
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: '[name].[hash:8].[ext]'
                },
                exclude: /node_modules/
            }
        ]
    }
};
