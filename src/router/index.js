import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)
// 解决路由命名冲突报错
const originalReplace = VueRouter.prototype.replace
VueRouter.prototype.replace = function replace (location) {
  return originalReplace.call(this, location).catch(err => err)
}
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}
export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: { name: 'login' }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/Login'),
      meta: {
        title: '个人博客'
      }
    }, {
      path: '/register',
      name: 'register',
      component: () => import('@/views/Register'),
      meta: {
        title: '账号注册'
      }
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/views/frontHome'), // 挂载导航栏公共样式
      redirect: { name: 'Home' }, // 跳转到子路由文章首页
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/frontHome/Home'),
          meta: {
            title: '首页'
          }
        },
        {
          path: 'allPosts',
          name: 'allPosts',
          component: () => import('@/views/frontHome/AllPosts'),
          meta: {
            title: '所有文章'
          }
        },
        {
          path: 'category',
          name: 'category',
          component: () => import('@/views/frontHome/Category'),
          meta: {
            title: '文章分类'
          }
        },
        {
          path: 'details',
          name: 'details',
          component: () => import('@/views/frontHome/Details'),
          meta: {
            title: '文章详情'
          }
        },
        {
          path: 'search',
          name: 'searchPost',
          component: () => import('@/views/frontHome/Home/search')
        }
      ]
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: () => import('@/views/frontHome/User'),
      redirect: { name: 'center' },
      children: [
        {
          path: '',
          name: 'center',
          component: () => import('@/views/frontHome/User/Detail'),
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'editpwd',
          name: 'editpwd',
          component: () => import('@/views/frontHome/User/EditPwd'),
          meta: {
            title: '密码修改'
          }
        }
      ]
    },
    {
      path: '/',
      name: 'adminHome',
      redirect: { name: 'detail' },
      component: () => import('@/views/Admin'),
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: () => import('@/views/Welcome')
        },
        {
          path: 'detail',
          name: 'detail',
          component: () => import('@/views/Admin/Detail'),
          meta: {
            title: '仪表盘 < 博客后台'
          }
        },
        {
          path: 'all-articles',
          name: 'allArticles',
          component: () => import('@/views/Admin/Article/List'),
          meta: {
            title: '所有文章 < 博客后台'
          }
        },
        {
          path: 'add-article',
          name: 'addArticle',
          component: () => import('@/views/Admin/Article/Add'),
          meta: {
            title: '文章编辑 < 博客后台'
          }
        },
        {
          path: 'article-category',
          name: 'articleCategory',
          component: () => import('@/views/Admin/Article/Category'),
          meta: {
            title: '文章分类 < 博客后台'
          }
        },
        {
          path: 'comments',
          name: 'comments',
          component: () => import('@/views/Admin/Comment'),
          meta: {
            title: '评论列表 < 博客后台'
          }
        },
        {
          path: 'users',
          name: 'users',
          component: () => import('@/views/Admin/User'),
          meta: {
            title: '用户列表 < 博客后台'
          }
        },
        {
          path: 'options',
          name: 'options',
          component: () => import('@/views/Admin/Option'),
          meta: {
            title: '网站设置 < 博客后台'
          }
        }
      ],
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/401',
      name: '401',
      component: () => import('@/views/error-page/401')
    },
    {
      path: '*',
      name: 'NotFound',
      component: () => import('@/views/error-page/404')
    }
  ]
})
