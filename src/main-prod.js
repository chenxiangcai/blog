import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import store from './store'
import VueLazyload from 'vue-lazyload'
import moment from 'moment'
import Player from 'zw-player'
import { axiosPath } from '@/api'

// 导入全样式
import './assets/css/global.css'
// 导入自定义字体图标样式
import './assets/fonts/iconfont.css'
// 导入编辑控件
import VueQuillEditor from 'vue-quill-editor'
Vue.component('Player', Player)
Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: '../../assets/images/error.png',
  loading: '../../assets/images/load.gif',
  attempt: 1
})
Vue.use(VueQuillEditor)

// 挂载axios全局对象
Vue.prototype.$http = axios
// 设置axios默认请求地址前缀
axios.defaults.baseURL = axiosPath
// 配置axios请求头的token
axios.interceptors.request.use(config => {
  if (config.url.includes('3000')) return config
  else {
    config.headers.Authorization = window.sessionStorage.getItem('token')
    return config
  }
})

// 配置挂载时间格式化工具
moment.locale('zh-cn')
Vue.prototype.$moment = moment

// 时间过滤器
Vue.filter('dateFormat', dateTime => {
  const dt = new Date(dateTime)
  const y = dt.getFullYear()
  const m = (dt.getMonth() + 1 + '').padStart(2, '0')
  const d = (dt.getDate() + '').padStart(2, '0')
  const hh = (dt.getHours() + '').padStart(2, '0')
  const mm = (dt.getMinutes() + '').padStart(2, '0')
  const ss = (dt.getSeconds() + '').padStart(2, '0')
  return `${y}-${m}-${d}   ${hh}:${mm}:${ss}`
})

// 定义全局路由拦截守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
  axios.post('/admin/validate', {}).then(res => {
    // 普通路由 如果普通用户登录 存储用户信息
    if (res.data.status === 0) {
      store.commit('LOGIN', res.data)
      next()
    }
    // 拦截需要权限的路由(管理员才能访问的路由)
    if (to.matched.some(value => value.meta.requiresAuth)) {
      // 如果没登陆 跳转到登录页
      if (!sessionStorage.getItem('token')) {
        next({
          name: 'login'
        })
      } else { // 如果已登录 判断角色权限
        // 如果是普通角色 跳转到401页面
        if (res.data.status === 0) {
          store.commit('LOGIN', res.data)
          next({
            name: '401'
          })
        } else {
          // 如果是管理员 保存数据到store中
          store.commit('LOGIN', res.data)
        }
        next()
      }
    } else next()
  }).catch(err => err)
})

Vue.config.productionTip = false
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
