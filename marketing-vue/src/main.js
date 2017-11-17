// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import App from './App.vue'
import timeFormater from './util/filter/time-formater'
import { imgFile } from './util/filter/img-file'
import { videoFile } from './util/filter/video-file'
import { textInterception } from './util/filter/text-interception'
require('./util/third/clipboard.min')

Vue.config.productionTip = false

Vue.filter('time_format', timeFormater.UnixToDate)

Vue.filter('imgFile', imgFile)

Vue.filter('videoFile', videoFile)

Vue.filter('textInterception', textInterception)

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
