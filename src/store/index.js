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
		setAudio(state, audio){
			if (!state.listenCount) {
				state.showPlayer = true  // 首次进入应用时不可打开播放详情
			}
			state.listenCount++
			state.audio = {...(state.audio), ...audio}
		},
		setAudioTime(state, time){
			state.audio.currentLength = time
		},
		setCurrent(state, flag){
			state.audio.currentFlag = flag
		},
		toggleAudioLoadding: (state, flag) => {
			state.audioLoadding = flag
		},
		showDetailPlayer: (state, flag) => {
			state.detailPlayerFlag = flag
		},
		showPlayer: (state, flag) => {
			state.showPlayer = flag
		},
		isPlay: (state, flag) => {
			state.isPlay = flag
		},
		setLrc: (state, lrc) => {
			state.audio = {...(state.audio), lrc}
		},
		setListInfo: (state, {list, index}) => {
			state.listInfo.songList = list
			state.listInfo.songIndex = index
		}
	},
	actions: {
    getSong({commit, state}, hash){
			commit('toggleAudioLoadding', true)
			http.get(`/yy/index.php?r=play/getdata&hash=${hash}`,{
        baseURL: 'bproxy'
      }).then(({data}) => {
				data = data.data
				const songUrl = data.play_url
				const imgUrl = data.img
				const title = data.audio_name
				const songLength = data.timelength / 1000
				const singer = data.author_name
				const currentLength = 0;
				const lrc = data.lyrics
				const	audio = {songUrl, imgUrl, title, singer, songLength, currentLength}
				commit('setAudio', audio)
				commit('setLrc', lrc)
				commit('toggleAudioLoadding', false)
			})
		},
		prev({dispatch, state}){
			var list = state.listInfo.songList
			if (state.listInfo.songIndex == 0) {
				state.listInfo.songIndex = list.length
			} else {
				state.listInfo.songIndex--
			}
			var hash = list[state.listInfo.songIndex].hash
			dispatch('getSong', hash)
		},
		next({dispatch, state}){
			var list = state.listInfo.songList
			if (state.listInfo.songIndex == list.length - 1) {
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
