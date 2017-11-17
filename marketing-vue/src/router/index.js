import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component (resolve) {
      require(['../components/marketing/CourseList.vue'], resolve)
    }
  },
  {
    path: '/course/details/:courseId',
    component (resolve) {
      require(['../components/marketing/CourseDetails.vue'], resolve)
    }
  }
]

const router = new VueRouter({
  routes
})

export default router
