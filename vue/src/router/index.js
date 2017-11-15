import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

let router = new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component (resolve) {
        require(['../components/HelloWorld.vue'], resolve)
      },
      meta: {
        isBackHide: true
      }
    },
    {
      path: '/camera',
      name: 'camera',
      component (resolve) {
        require(['../components/camera.vue'], resolve)
      }
    },
    {
      path: '/battery',
      name: 'battery',
      component (resolve) {
        require(['../components/battery.vue'], resolve)
      }
    },
    {
      path: '/contacts',
      name: 'contacts',
      component (resolve) {
        require(['../components/contacts.vue'], resolve)
      }
    },
    {
      path: '/device',
      name: 'device',
      component (resolve) {
        require(['../components/device.vue'], resolve)
      }
    },
    {
      path: '/motion',
      name: 'motion',
      component (resolve) {
        require(['../components/device_motion.vue'], resolve)
      }
    },
    {
      path: '/orientation',
      name: 'orientation',
      component (resolve) {
        require(['../components/device_orientation.vue'], resolve)
      }
    },
    {
      path: '/dialogs',
      name: 'dialogs',
      component (resolve) {
        require(['../components/dialogs.vue'], resolve)
      }
    }
  ]
})
router.beforeEach((to, from, next) => {
  let arrTimer = []
  let recurve = () => {
    if (!window._vue) {
      let timer = setTimeout(() => {
        recurve()
      }, 100)
      arrTimer.push(timer)
    } else {
      arrTimer.forEach(timer => {
        clearTimeout(timer)
      })
      window._vue && window._vue.$store.dispatch('showLoading')
      next()
    }
  }
  recurve()
})

router.afterEach((to) => {
  window._vue && window._vue.$store.dispatch('hideLoading')
})

export default router
