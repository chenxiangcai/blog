import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决路由命名冲突报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
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
    path: '/',
    name: 'adminHome',
    redirect: { name: 'welcome' },
    component: () => import('@/views/Admin'),
    children: [{
      path: 'welcome',
      name: 'welcome',
      component: () => import('@/views/Welcome')
    }, {
      path: 'detail',
      name: 'detail',
      component: () => import('@/views/Admin/Detail')
    }, {
      path: 'all-articles',
      name: 'allArticles',
      component: () => import('@/views/Admin/Article/List')
    }, {
      path: 'add-article',
      name: 'addArticle',
      component: () => import('@/views/Admin/Article/Add')
    }, {
      path: 'article-category',
      name: 'articleCategory',
      component: () => import('@/views/Admin/Article/Category')
    }, {
      path: 'comments',
      name: 'comments',
      component: () => import('@/views/Admin/Comment')
    }, {
      path: 'users',
      name: 'users',
      component: () => import('@/views/Admin/User')
    }, {
      path: 'options',
      name: 'options',
      component: () => import('@/views/Admin/Option')
    }],
    meta: {
      requiresAuth: true
    }
  }, {
    path: '/401',
    name: '401',
    component: () => import('@/views/error-page/401')
  }, {
    path: '*',
    name: 'NotFound',
    component: () => import('@/views/error-page/404')
  }]
})
