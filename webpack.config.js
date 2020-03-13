const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

const DIST = path.resolve(__dirname, './dist');
const SRC = path.resolve(__dirname, './src/index.ts');
const SRC_TYPES = path.resolve(__dirname, './src/index.d.ts');

const getBaseConfig = production => ({
    mode: production ? 'production' : 'development',
    devtool: production ? false : 'eval',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts', '.js']
    }
});

module.exports = ({ production = false } = {}) => {
    const base = getBaseConfig(production);
    return {
        ...base,
        entry: SRC,
        output: {
            filename: 'index.js',
            path: DIST
        },
        plugins: [
            new CopyPlugin([
                {
                    from: SRC_TYPES,
                    to: DIST
                }
            ])
        ]
    };
};
