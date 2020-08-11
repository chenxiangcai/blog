import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

export default new VueRouter({
  mode: 'history',
  routes: [{
    path: '/',
    redirect: { name: 'login' }
  }, {
    path: '/login',
    name: 'login',
    component: () => import('../components/Login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('../components/Home')
  }, {
    path: '/admin',
    name: 'adminHome',
    component: () => import('../components/AdminHome'),
    meta: {
      requiresAuth: true
    }
  }]
})
