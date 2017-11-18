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
require('../static/css/base.css')
require('./util/fit-2.0')

Vue.config.productionTip = false

Vue.filter('time_format', timeFormater.UnixToDate)

Vue.filter('imgFile', imgFile)

Vue.filter('videoFile', videoFile)

Vue.filter('textInterception', textInterception)

let iniVue = () => {
  /* eslint-disable no-new */
  new Vue({
    router,
    render: h => h(App)
  }).$mount('#app')
}

if (location.href.indexOf('localhost') > -1) {
  /* 开发 */
  iniVue()
} else if (location.href.indexOf('com') > -1) {
  /* web */
  iniVue()
} else {
  /* native */
  let app = {
    // Application Constructor
    initialize: function () {
      document.addEventListener('deviceready', this.onDeviceReady.bind(this), false)
    },
    // deviceready Event Handler
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function () {
      this.receivedEvent()
    },
    // Update DOM on a Received Event
    receivedEvent: function () {
      /* eslint-disable */
      iniVue()
    }
  }
  app.initialize()
}
