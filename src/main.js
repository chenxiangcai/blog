import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import './plugins/element.js'

// 导入全样式
import './assets/css/global.css'
// 导入自定义字体图标样式
import './assets/fonts/iconfont.css'

// 挂载axios全局对象
Vue.prototype.$http = axios
// 设置axios默认请求地址前缀
axios.defaults.baseURL = 'http://localhost:80'
// 配置axios请求头的token
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  return config
})

// 定义全局守卫
router.beforeEach((to, from, next) => {
  if (to.matched.some(value => value.meta.requiresAuth)) {
    if (!sessionStorage.getItem('token')) {
      next({
        name: 'login'
      })
    } else {
      next()
    }
  } else {
    next()
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
