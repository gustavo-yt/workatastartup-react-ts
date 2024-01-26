const config = {
    mode: 'production', // "production" | "development" | "none"
    resolve: {
        extensions: ['*', '.mjs', '.js', '.json']
    },
    module: {
        rules: [

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                },
            },
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: 'javascript/auto'
            }
        ]
    }
}

module.exports = config