import Vue from 'vue'
import Vuex from 'vuex'
import http from '@/http'
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    // 播放器参数
    audio: {
      songUrl: '',
      imgUrl: 'http://m.kugou.com/v3/static/images/index/logo_kugou.png',
      title: '',
      singer: '',
      currentLength: 0,
      songLength: 0,
      currentFlag: false
    },
    audioLoadding: false,
    detailPlayerFlag: false,
    showPlayer: false,
    listenCount: 0,
    isPlay: true,
    listInfo: {
      songList: [],
      songIndex: 0
    }
  },
  getters: {
    audio: state => state.audio,
    audioLoadding: state => state.audioLoadding,
    detailPlayerFlag: state => state.detailPlayerFlag,
    showPlayer: state => state.showPlayer,
    isPlay: state => state.isPlay
  },
  mutations: {
    setAudio (state, audio) {
      if (!state.listenCount) {
        state.showPlayer = true // 首次进入应用时不可打开播放详情
      }
      state.listenCount++
      state.audio = { ...(state.audio),
        ...audio
      }
    },
    setAudioTime (state, time) {
      state.audio.currentLength = time
    },
    setCurrent (state, flag) {
      state.audio.currentFlag = flag
    },
    toggleAudioLoadding (state, flag) {
      state.audioLoadding = flag
    },
    showDetailPlayer (state, flag) {
      state.detailPlayerFlag = flag
    },
    showPlayer (state, flag) {
      state.showPlayer = flag
    },
    isPlay (state, flag) {
      state.isPlay = flag
    },
    setLrc (state, lrc) {
      state.audio = { ...(state.audio),
        lrc
      }
    },
    setListInfo (state, {list, index}) {
      state.listInfo.songList = list
      state.listInfo.songIndex = index
    }
  },
  actions: {
    getSong ({commit, state}, hash) {
      commit('toggleAudioLoadding', true)
      let params = {
        cmd: 'playInfo',
        hash: hash,
        from: 'mkugou',
        apiver: 2,
        mid: '115c552b2837817623644e8ef13bd97b',
        userid: 0,
        platid: 5,
        dfid: null
      }
      http.get(`/api/v1/song/get_song_info`, { params }).then(({data}) => {
        const songUrl = data.url
        const imgUrl = data.imgUrl.replace(`{size}`, 200)
        const title = data.songName
        const songLength = data.timeLength
        const singer = data.singerName
        const currentLength = 0

        const audio = {
          songUrl,
          imgUrl,
          title,
          singer,
          songLength,
          currentLength
        }

        commit('setAudio', audio)
        commit('toggleAudioLoadding', false)

        // 获取歌词
        const fileName = data.fileName
        const lrcParams = {
          cmd: '100',
          keyword: fileName,
          hash: hash,
          timelength: songLength,
          d: 0.069002061424569
        }

        http.get('/app/i/krc.php', {params: lrcParams, responseType: 'text/html'}).then(data => {
          const lrc = data.data
          commit('setLrc', lrc)
        })
      })
    },
    prev ({dispatch, state}) {
      var list = state.listInfo.songList
      if (state.listInfo.songIndex === 0) {
        state.listInfo.songIndex = list.length
      } else {
        state.listInfo.songIndex--
      }
      var hash = list[state.listInfo.songIndex].hash
      dispatch('getSong', hash)
    },
    next ({dispatch, state}) {
      var list = state.listInfo.songList
      if (state.listInfo.songIndex === list.length - 1) {
        state.listInfo.songIndex = 0
      } else {
        ++state.listInfo.songIndex
      }
      var hash = list[state.listInfo.songIndex].hash
      dispatch('getSong', hash)
    }
  }
})

export default store
