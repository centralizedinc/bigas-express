import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
import './plugins/ant-design-vue.js'
import mixins from './plugins/mixins.js'
import axios from 'axios'
import * as VueGoogleMaps from 'vue2-google-maps'
import VueGeolocation from 'vue-browser-geolocation';


Vue.config.productionTip = false
axios.defaults.baseURL=process.env.VUE_APP_API_BASE_URI
Vue.prototype.$http = axios

Vue.use(mixins);
Vue.use(VueGeolocation);
Vue.use(VueGoogleMaps, {
  load: {
    key: process.env.VUE_APP_GOOGLE_MAP_KEY || 'AIzaSyAs_h0Qy525HDuTgPz7j516eO29niEzLv4',
  },
  installComponents: true
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
