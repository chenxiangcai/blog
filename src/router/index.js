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

// 路由懒加载
const Login = () => import(/* webpackChunkName: "Login_Register" */ '@/views/Login')
const Register = () => import(/* webpackChunkName: "Login_Register" */ '@/views/Register')

const frontHome = () => import(/* webpackChunkName: "frontHome" */ '@/views/frontHome')
const Home = () => import(/* webpackChunkName: "frontHome" */ '@/views/frontHome/Home')
const allPosts = () => import(/* webpackChunkName: "frontHome" */ '@/views/frontHome/AllPosts')
const Category = () => import(/* webpackChunkName: "frontHome" */ '@/views/frontHome/Category')
const Details = () => import(/* webpackChunkName: "frontHome" */ '@/views/frontHome/Details')
const Search = () => import(/* webpackChunkName: "frontHome" */ '@/views/frontHome/Home/search')

const User = () => import(/* webpackChunkName: "personalCenter" */ '@/views/frontHome/User')
const Center = () => import(/* webpackChunkName: "personalCenter" */ '@/views/frontHome/User/Detail')
const EditPwd = () => import(/* webpackChunkName: "personalCenter" */ '@/views/frontHome/User/EditPwd')

const adminCenter = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin')
const Welcome = () => import(/* webpackChunkName: "Admin" */ '@/views/Welcome')
const adminDetail = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Detail')
const List = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Article/List')
const Add = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Article/Add')
const articleCategory = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Article/Category')
const Comment = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Comment')
const userList = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/User')
const Option = () => import(/* webpackChunkName: "Admin" */ '@/views/Admin/Option')

const error401 = () => import(/* webpackChunkName: "Error" */ '@/views/error-page/401')
const error404 = () => import(/* webpackChunkName: "Error" */ '@/views/error-page/404')

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
      component: Login,
      meta: {
        title: '个人博客'
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        title: '账号注册'
      }
    },
    {
      path: '/',
      name: 'adminHome',
      component: adminCenter,
      redirect: { name: 'welcome' },
      children: [
        {
          path: 'welcome',
          name: 'welcome',
          component: Welcome
        },
        {
          path: 'detail',
          name: 'detail',
          component: adminDetail,
          meta: {
            title: '仪表盘 < 博客后台'
          }
        },
        {
          path: 'all-articles',
          name: 'allArticles',
          component: List,
          meta: {
            title: '所有文章 < 博客后台'
          }
        },
        {
          path: 'add-article',
          name: 'addArticle',
          component: Add,
          meta: {
            title: '文章编辑 < 博客后台'
          }
        },
        {
          path: 'article-category',
          name: 'articleCategory',
          component: articleCategory,
          meta: {
            title: '文章分类 < 博客后台'
          }
        },
        {
          path: 'comments',
          name: 'comments',
          component: Comment,
          meta: {
            title: '评论列表 < 博客后台'
          }
        },
        {
          path: 'users',
          name: 'users',
          component: userList,
          meta: {
            title: '用户列表 < 博客后台'
          }
        },
        {
          path: 'options',
          name: 'options',
          component: Option,
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
      path: '/home',
      name: 'home',
      component: frontHome, // 挂载导航栏公共样式
      redirect: { name: 'Home' }, // 跳转到子路由文章首页
      children: [
        {
          path: '',
          name: 'Home',
          component: Home,
          meta: {
            title: '首页'
          }
        },
        {
          path: 'allPosts',
          name: 'allPosts',
          component: allPosts,
          meta: {
            title: '所有文章'
          }
        },
        {
          path: 'category',
          name: 'category',
          component: Category,
          meta: {
            title: '文章分类'
          }
        },
        {
          path: 'details',
          name: 'details',
          component: Details,
          meta: {
            title: '文章详情'
          }
        },
        {
          path: 'search',
          name: 'searchPost',
          component: Search
        }
      ]
    },
    {
      path: '/personalCenter',
      name: 'personalCenter',
      component: User,
      redirect: { name: 'center' },
      children: [
        {
          path: '',
          name: 'center',
          component: Center,
          meta: {
            title: '个人中心'
          }
        },
        {
          path: 'editpwd',
          name: 'editpwd',
          component: EditPwd,
          meta: {
            title: '密码修改'
          }
        }
      ]
    },
    {
      path: '/401',
      name: '401',
      component: error401
    },
    {
      path: '*',
      name: 'NotFound',
      component: error404
    }
  ]
})
