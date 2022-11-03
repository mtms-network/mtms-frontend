require('@babel/register');
const { merge } = require('webpack-merge');

const common = require('./config/webpack/webpack.common.babel');

const envs = {
  development: 'dev',
  production: 'prod',
};

const env = envs[process.env.NODE_ENV || 'development'];
// const env = envs.development;
const envConfig = require(`./config/webpack/webpack.${env}.babel`);
module.exports = merge(common, envConfig);
