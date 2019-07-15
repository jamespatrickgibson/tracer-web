import Vue from 'vue'
import Router from 'vue-router'
import Logbook from './views/Logbook.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  linkExactActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Logbook,
      children: [
        {
          path: '/',
          name: 'Jumps',
          component: () => import(/* webpackChunkName: "jumps" */ './views/LogbookJumps.vue')
        },
        {
          path: '/jumps/detail',
          name: 'Jump Detail',
          component: () => import(/* webpackChunkName: "jump-detail" */ './views/LogbookDetail.vue')
        }
      ]
    },
    {
      path: '/add-jump',
      name: 'Add Jump',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "addjump" */ './views/AddJump.vue')
    },
    {
      path: '/settings',
      name: 'Settings',
      component: () => import(/* webpackChunkName: "settings" */ './views/Settings.vue')
    }
  ]
})
