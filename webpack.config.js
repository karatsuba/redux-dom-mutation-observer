const path = require('path');

const DIST = path.resolve(__dirname, './dist');
const SRC = path.resolve(__dirname, './src/index.ts');

module.exports = ({ production = false } = {}) => ({
    mode: production ? 'production' : 'development',
    resolve: {
        extensions: ['.ts', '.js']
    },
    entry: SRC,
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    output: {
        filename: 'index.js',
        path: DIST,
        library: 'ReduxDOMMutationObserver',
        libraryTarget: 'umd'
    }
});
