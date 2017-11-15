// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

require('./util/flexible')

Vue.config.productionTip = false

let iniVue = () => {
  /* eslint-disable no-new */
  window._vue = new Vue({
    el: '#app',
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
}

if (location.href.indexOf('8080') > -1) {
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
