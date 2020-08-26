import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userInfo: {},
    editForm: {},
    host: 'http://localhost',
    upURL: 'http://localhost/upload'
  },
  mutations: {
    LOGIN (state, userInfo) {
      state.userInfo = userInfo
    },
    EDITFORM (state, editForm) {
      state.editForm = editForm
    },
    CLEARFORM (state) {
      state.editForm = ''
    }
  },
  actions: {},
  modules: {}
})
