const config = require('../config')
const path = require('path')
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)
module.exports = {
    // devtool: 'cheap-module-eval-source-map',
    devtool: 'sourcemap',
    // these devServer options should be customized in /config/index.js
    devServer: {
    // clientLogLevel: 'warning',
    // historyApiFallback: {
    //     rewrites: [
    //     { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
    //     ],
    // },
    hot: true,
    // contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    // host: HOST || config.dev.host,
    // port: PORT || config.dev.port,
    port: 9099,
    host: 'localhost',
    open: true,
    // open: config.dev.autoOpenBrowser,
    // overlay: config.dev.errorOverlay
    //     ? { warnings: false, errors: true }
    //     : false,
    // publicPath: config.dev.assetsPublicPath,
    // proxy: config.dev.proxyTable,
    // quiet: true, // necessary for FriendlyErrorsPlugin
    // watchOptions: {
    //     poll: config.dev.poll,
    // }
    }
}
