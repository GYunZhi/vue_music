<template>
  <div class="audio-wrap" :class="{'audio_panel_hide': toggleHide}" v-if="showPlayer">

    <audio
      id="player"
      :src="audio.songUrl"
      autoplay
      @timeupdate="change"
      @ended="next"
      @error="next"
    ></audio>

    <div class="audio-panel-control" @click="togglePanel" :class="{'toggle-contral':toggleHide}">
      <mt-spinner type="snake" :size="28" v-show="audioLoadding"></mt-spinner>
    </div>

    <div class="audio-panel">
      <img alt class="player-img" :src="audio.imgUrl" @click="showDetailPlayer">
      <div class="player-status" @click="showDetailPlayer">
        <p class="player-title ellipsis">{{audio.title}}</p>
        <p class="player-singer ellipsis">{{audio.singer}}</p>
      </div>
      <div class="player-controls">
        <span class="player-play" @click="toggleStatus" :class="{'player-pause': isPlay}"></span>
        <span class="player-nextSong" @click="next"></span>
      </div>
    </div>

  </div>
</template>

<script>
import { Spinner } from 'mint-ui'
import { mapGetters } from "vuex"
export default {
  name: "player",
  data() {
    return {
      toggleHide: false
    }
  },
  computed: {
    ...mapGetters(["audio", "audioLoadding", "showPlayer", "isPlay"])
  },
  methods: {
    togglePanel () {
      this.toggleHide = !this.toggleHide
    },
    // 播放、暂停
    toggleStatus () {
      if (this.isPlay) {
        document.getElementById("player").pause()
      } else {
        document.getElementById("player").play()
      }
      this.$store.commit("isPlay", !this.isPlay)
    },
    // 播放详情
    showDetailPlayer() {
      if (this.showPlayer) {
        this.$store.commit("showDetailPlayer", true)
      }
    },
    change() {
      var time = document.getElementById("player").currentTime
      if (this.audio.currentFlag) {
        document.getElementById("player").currentTime = this.audio.currentLength
        this.$store.commit("setCurrent", false)
      } else {
        this.$store.commit("setAudioTime", time)
      }
    },
    next() {
      this.$store.dispatch("next");
    }
  },
  components: {
    [Spinner.name]: Spinner
  }
};
</script>

<style lang="less">
.audio-wrap {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  width: 100%;
  transition: all 0.5s;
  -webkit-transition: all 0.5s;
}
.audio-wrap .mint-spinner-snake {
  background-color: #000;
  margin: 4px;
}
.audio-panel {
  display: flex;
  width: 100%;
  height: 1.68rem;
  background-color: rgba(0,0,0,.9);
  padding: 7px;
  font-size: 16px;
}
.audio_panel_hide {
  bottom: -1.68rem;
}
.audio-panel-control {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  background: rgba(0, 0, 0, 0.8) url("../assets/images/close_icon.png") no-repeat center;
  background-size: 25px;
  margin-left: 10px;
  margin-bottom: 10px;
  overflow: hidden;
}
.toggle-contral {
  background: rgba(0, 0, 0, 0.8) url("../assets/images/open_icon.png") no-repeat center;
  background-size: 25px !important;
}
.player-img {
  float: left;
  height: 100%;
  border-radius: 2px;
}
.player-status {
  float: left;
  width: 50%;
  height: 100%;
  margin-left: 3%;
  padding: 5px 0;
}
.player-title {
  width: 100%;
  font-size: 18px;
  color: #fff;
}
.player-singer {
  display: block;
  width: 100%;
  color: #888;
  padding-top: 0.24rem;
}
.player-controls {
  float: right;
  width: 30%;
  height: 100%;
}
.player-controls span {
  float: left;
  width: 50%;
  height: 100%;
}
.player-play {
  background: url("../assets/images/play_icon.png") no-repeat center;
  background-size: auto 70%;
}
.player-pause {
  background: url("../assets/images/pause_icon.png") no-repeat center;
  background-size: auto 70%;
}
.player-nextSong {
  background: url("../assets/images/next_icon.png") no-repeat center;
  background-size: auto 70%;
}
.mint-navbar .mint-tab-item.is-selected {
  margin-bottom: 0;
}
</style>
