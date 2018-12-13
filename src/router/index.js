import Vue from 'vue'
import Router from 'vue-router'

import newSong from '@/views/new-song'
import rank from '@/views/rank'
import plist from '@/views/plist'
import plistDetail from '@/views/plist-detail'
import singer from '@/views/singer'
import search from '@/views/search'

Vue.use(Router)

const redirect = {
  path: '*',
  redirect: '/'
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'new-song',
      component: newSong,
      meta: {
        title: '新歌'
      }
    }, {
      path: '/rank',
      name: 'rank',
      component: rank,
      meta: {
        title: '排行'
      }
    }, {
      path: '/plist',
      name: 'plist',
      component: plist,
      meta: {
        title: '歌单'
      }
    }, {
      path: '/plist-detail/:id',
      name: 'plist-detail',
      component: plistDetail,
      meta: {
        title: '歌单详情'
      }
    }, {
      path: '/singer',
      name: 'singer',
      component: singer,
      meta: {
        title: '歌手'
      }
    }, {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        title: '搜索'
      }
    },
    redirect
  ]
})
