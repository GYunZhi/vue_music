import Vue from 'vue'
import Router from 'vue-router'

import NewSong from '@/views/newSong/new-song'
import Rank from '@/views/rank/rank'
import Plist from '@/views/plist/plist'
import Singer from '@/views/singer/singer'
import Search from '@/views/search/search'

import CNavBar from '@/components/CNavBar'
import CSearchBar from '@/components/CSearchBar'

Vue.use(Router)

export default new Router({
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'NewSong',
      components:{
        default: NewSong,
        nav: CNavBar
      }
    },
    {
      path: '/rank',
      name: 'Rank',
      components:{
        default: Rank,
        nav: CNavBar
      }
    },
    {
      path: '/plist',
      name: 'Plist',
      components:{
        default: Plist,
        nav: CNavBar
      }
    },
    {
      path: '/singer',
      name: 'Singer',
      components:{
        default: Singer,
        nav: CNavBar
      }
    },
    {
      path: '/search',
      name: 'Search',
      components:{
        default: Search,
        search: CSearchBar
      }
    }
  ]
})
