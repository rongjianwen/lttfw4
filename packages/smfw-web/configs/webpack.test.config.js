const path = require('path');
const { merge } = require('webpack-merge');
const createConfig = require('../../../configs/create-webpack-config');

const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';
const pkg = require('../package.json');
const lerna = require('../../../lerna.json');

const { libname } = pkg;
const { version } = lerna;

const projectDir = path.resolve(__dirname, '../');
const sourceDir = path.join(projectDir, 'src', 'test');

const defaultExternals = require('./defaultExternals');

const externals = {
    ...defaultExternals
};

const ROOT_URL = mode !== 'development' ? `/v${version}/${libname}` : '';
const ENV = {
    NODE_ENV: mode,
    VERSION: version,
    ROOT_URL,
    VENDOR_URL: `${ROOT_URL}/vendor`
};

const config = merge(
    createConfig({
        ENV,
        pkg,
        projectDir,
        sourceDir
    }),
    {
        externals: isDev ? {} : externals,
        output: {
            path: path.join(projectDir, 'build', 'test'),
            filename: 'bundle.js',
            publicPath: ROOT_URL !== '' ? ROOT_URL : '/'
        }
    }
);

module.exports = config;
