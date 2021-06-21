module.exports = {
    mode: 'development',
    eval: '',
    entry: 'src',
    output: '.\template',
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: '',
                exclude: '',
                loader: '',
                options: []
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: '',
        })
    ],
    devServer: {
        host: '',
        port: '',
        hot: true,
        proxy: {

        }
    }
}