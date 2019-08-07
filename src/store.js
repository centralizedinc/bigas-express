import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)
import WebviewApi from './webview_api'

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
    CALLBACK_CONFIRM(context, data) {
      return new WebviewApi().callbackWebview(data.sender, data.postback)
    },
    SAVE_ORDER(context, data) {
      return new WebviewApi().saveOrder(data)
    }
  }
})
