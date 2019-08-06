import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/ant-design-vue.js'
import mixins from './plugins/mixins.js'
import axios from 'axios'

Vue.config.productionTip = false
axios.defaults.baseURL=process.env.VUE_APP_API_BASE_URI
Vue.prototype.$http = axios

Vue.use(mixins);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
