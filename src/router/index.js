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
    component: () => import('@/views/Login')
  },
  {
    path: '/home',
    name: 'home',
    component: () => import('@/views/Home')
  }, {
    path: '/admin',
    name: 'adminHome',
    component: () => import('@/views/AdminHome'),
    meta: {
      requiresAuth: true
    }
  }]
})
