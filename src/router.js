import Vue from 'vue'
import Router from 'vue-router'
import Logbook from './views/Logbook.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'Logbook',
      component: Logbook
    },
    {
      path: '/add-jump',
      name: 'Add Jump',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "addjump" */ './views/AddJump.vue')
    }
  ]
})
