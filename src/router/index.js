import Vue from 'vue'
import Router from 'vue-router'
import NewSong from '@/views/new-song/new-song'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'NewSong',
      component: NewSong
    }
  ]
})
