import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAxios from 'vue-axios'
import http from './http'
import CNavBar from '@/components/CNavBar'
import CTitleHead from '@/components/CTitleHead'

Vue.use(MintUI)
Vue.use(VueAxios, http)
Vue.component('c-nav-bar', CNavBar)
Vue.component('c-title-head', CTitleHead)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
