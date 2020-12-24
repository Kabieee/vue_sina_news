import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import http from './utils/http'
import echarts from 'echarts'
import moment from 'moment'

import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
Vue.use(ViewUI)

Vue.config.productionTip = false
Vue.prototype.$http = http
Vue.prototype.$echarts = echarts
Vue.prototype.$moment = moment


const vm = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

export default vm