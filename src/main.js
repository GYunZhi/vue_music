import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueAxios from 'vue-axios'
import http from './http'
// import { flexible } from '@/utils/tools'
// import 'lib-flexible/flexible'

Vue.use(VueAxios, http)

Vue.use(MintUI)

router.beforeEach((to, from, next) => {
  // flexible()
  next()
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
