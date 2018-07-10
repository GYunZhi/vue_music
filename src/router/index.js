import Vue from 'vue'
import Router from 'vue-router'

import newSong from '@/views/newSong'
import rank from '@/views/rank'
import plist from '@/views/plist'
import singer from '@/views/singer'
import search from '@/views/search'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'new-song',
      component: newSong,
      meta: {
        title: '新歌'
      }
    },
    {
      path: '/rank',
      name: 'rank',
      component: rank,
      meta: {
        title: '排行'
      }
    },
    {
      path: '/plist',
      name: 'plist',
      component: plist,
      meta: {
        title: '歌单'
      }
    },
    {
      path: '/singer',
      name: 'singer',
      components: singer,
      meta: {
        title: '歌手'
      }
    },
    {
      path: '/search',
      name: 'search',
      components: search
    }
  ]
})
