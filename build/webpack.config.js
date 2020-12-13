const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
const devConfig = require('./webpack.dev.config')
const proConfig = require('./webpack.pro.config')

// Wrong!
// let config = process.NODE_ENV === 'development' ? devConfig : proConfig
// module.exports = merge(baseConfig, config)

module.exports = (env, argv) => {
    let config = argv.mode === 'development' ? devConfig : proConfig;
    return merge(baseConfig, config);
};

// 1. output， plugin 会变化 ； 2. 每个页面是一个线程。

