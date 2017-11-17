import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component (resolve) {
      require(['../components/CourseList.vue'], resolve)
    }
  },
  {
    path: '/course/details/:course_id', component (resolve) {
    require(['../components/CourseDetails.vue'], resolve)
  }
  }
]

const router = new VueRouter({
  routes
})

export default router
