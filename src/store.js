import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    details: {}
  },
  mutations: {
    ORDERS(state, data) {
      state.details = data
    }
  },
  actions: {
  }
})
