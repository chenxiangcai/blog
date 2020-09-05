import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    login: false,
    userInfo: {},
    editForm: {},
    settings: {},
    host: 'http://localhost',
    upURL: 'http://localhost/upload'
  },
  mutations: {
    LOGIN (state, userInfo) {
      state.userInfo = userInfo
      state.login = true
    },
    USERINFO (state, userInfo) {
      state.userInfo.userInfo.nickName = userInfo.nickName
      state.userInfo.userInfo.email = userInfo.email
      state.userInfo.userInfo.avatar = userInfo.avatar
    },
    EDITFORM (state, editForm) {
      state.editForm = editForm
    },
    CLEARFORM (state) {
      state.editForm = ''
    },
    SETTINGS (state, settings) {
      state.settings = settings
    }
  },
  actions: {},
  modules: {}
})
