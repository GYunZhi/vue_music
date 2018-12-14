import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAxios from 'vue-axios'
import http from './http'
import 'normalize.css/normalize.css'
import { Cell } from 'mint-ui'
import CNavBar from '@/components/CNavBar'
import CTitleHead from '@/components/CTitleHead'

// 注册全局Mint-UI组件
Vue.component(Cell.name, Cell)

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
