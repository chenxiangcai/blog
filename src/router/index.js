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
    component: () => import('@/views/admin/AdminHome'),
    children: [{
      path: '/welcome',
      name: 'welcome',
      component: () => import('@/views/Welcom')
    }, {
      path: '/detail',
      name: 'detail',
      component: () => import('@/views/admin/Detail')
    }, {
      path: '/all-articles',
      name: 'allArticles',
      component: () => import('@/views/admin/AllArticles')
    }, {
      path: '/new-article',
      name: 'newArticle',
      component: () => import('@/views/admin/NewArticle')
    }, {
      path: '/article-category',
      name: 'articleCategory',
      component: () => import('@/views/admin/ArticleCategory')
    }, {
      path: '/comments',
      name: 'comments',
      component: () => import('@/views/admin/Comments')
    }, {
      path: '/users',
      name: 'users',
      component: () => import('@/views/admin/Users')
    }, {
      path: '/options',
      name: 'options',
      component: () => import('@/views/admin/Options')
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
