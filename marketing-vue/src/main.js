// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import App from './App.vue'
import timeFormater from './util/filter/time-formater'

Vue.config.productionTip = false

Vue.filter('time_format', function (value, input) {
  let temp = input === 'full'
  return timeFormater.UnixToDate(value, temp)
})

Vue.filter('imgFile', function (value, fm) {
  if (!value) return ''
  return document.getElementById('app').dataset.img_domain + value + (fm ? fm : '')
})

Vue.filter('videoFile', function (value, fm) {
  if (!value) return ''
  if (document.getElementById('app').dataset.origin === 0 || document.getElementById('app').dataset.origin === '0') {
    return document.getElementById('app').dataset.video_domain + value + (fm ? fm : '')
  } else {
    return document.getElementById('app').dataset.video_no_referer + value + (fm ? fm : '')
  }
})

Vue.filter('textInterception', function (value, limit_length) {
  if (!value) return ''
  if (value.length > parseInt(limit_length)) {
    return value.substring(0, parseInt(limit_length) - 1) + '...'
  } else {
    return value
  }
})


const app = new Vue({
  router,
  App
})

app.$mount('#app')
