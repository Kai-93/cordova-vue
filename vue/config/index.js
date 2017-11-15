'use strict'
// Template version: 1.1.3
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

const urls = [
  '/'
]
const target = 'http://devvip.meiyezhushou.com/'
const turnProxyObj = (url, target) => {
  let temp = {
    target: `${target}`,
    changeOrigin: true
  }
  temp['pathRewrite'] = {}
  temp[`^${url}`] = `${url}`
  return temp
}
const turnProxy = (urls, target) => {
  let temp = {}
  urls.forEach((el) => {
    temp[el] = turnProxyObj(el, target)
  })
  return temp
}

let index = '../../www/index.html'
let assetsRoot = '../../www'
let assetsSubDirectory = 'static'
let assetsPublicPath = ''

if (process.env.platform === 'web') {
  index = '../dist/index.html'
  assetsRoot = '../dist'
  assetsSubDirectory = 'static/demo'
  assetsPublicPath = '/'
}

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, index),
    assetsRoot: path.resolve(__dirname, assetsRoot),
    assetsSubDirectory: assetsSubDirectory,
    assetsPublicPath: assetsPublicPath,
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: process.env.PORT || 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
