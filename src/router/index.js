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
    redirect: { name: 'welcome' },
    component: () => import('@/views/Admin/AdminHome'),
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
      component: () => import('@/views/Admin/AllArticles')
    }, {
      path: 'new-article',
      name: 'newArticle',
      component: () => import('@/views/Admin/NewArticle')
    }, {
      path: 'article-category',
      name: 'articleCategory',
      component: () => import('@/views/Admin/ArticleCategory')
    }, {
      path: 'comments',
      name: 'comments',
      component: () => import('@/views/Admin/Comments')
    }, {
      path: 'users',
      name: 'users',
      component: () => import('@/views/Admin/Users')
    }, {
      path: 'options',
      name: 'options',
      component: () => import('@/views/Admin/Options')
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
