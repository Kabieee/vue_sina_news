import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    globalTitle: 'vue',
  },
  mutations: {
    setGlobalTitle(state, value){
      state.globalTitle = value
    }
  },
  actions: {
  },
  modules: {
  }
})
