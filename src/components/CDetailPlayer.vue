<template>
  <div class="detail-player" v-show="detailPlayerFlag">

    <div class="detail-player-bg" :style="{backgroundImage:`url(${audio.imgUrl})`}"></div>
    <div
      class="detail-player-bg"
      :style="{backgroundImage:`url(${audio.imgUrl})`,filter: 'blur(5px)', '-webkit-filter':'blur(5px)'}">
    </div>

    <div class="detail-player-content">
      <div class="detail-player-title container">
        <span class="detail-player-back" @click="hideDetailPlayer()"></span>
        <div class="detai-title-text ellipsis">{{audio.title}}</div>
      </div>
      <div class="detail-player-img">
        <img :src="audio.imgUrl">
      </div>
      <div class="detail-player-lrc">
        <div class="lrc-content" :style="{marginTop: lrcOffset + 'px' }">
          <p
            v-for="(item,index) in songLrc"
            :key="index"
            :class="[{'isCurrentLrc': item.seconds >= audio.currentLength}, 'ellipsis']"
          >{{item.lrcContent}}</p>
        </div>
      </div>
      <div class="detail-player-range container">
        <span class="detail-player-time">{{audio.currentLength | time}}</span>
        <mt-range
          id="range"
          :min="0"
          :max="audio.songLength"
          v-model="audio.currentLength"
          :bar-height="3"
          @click.native="rangeChange($event)"
          disabled
          style="width: 80%"
        ></mt-range>
        <span class="detail-player-time">{{audio.songLength | time}}</span>
      </div>
      <div class="detail-player-control player-padding">
        <i class="detail-player-btn play-prev player_btn-sm" @click="prev"></i>
        <i
          class="detail-player-btn play-play player_btn-lg"
          :class="{'play-pause': isPlay}"
          @click="toggleStatus"
        ></i>
        <i class="detail-player-btn play-next player_btn-sm" @click="next"></i>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { Range } from 'mint-ui'
export default {
  data() {
    return {
      rangeValue: 0
    };
  },
  filters: {
    time(value) {
      var length = Math.floor(parseInt(value))
      var minute = Math.floor(value / 60)
      if (minute < 10) {
        minute = "0" + minute
      }
      var second = length % 60
      if (second < 10) {
        second = "0" + second
      }
      return minute + ":" + second
    }
  },
  computed: {
    ...mapGetters(["audio", "detailPlayerFlag", "isPlay"]),
    songLrc () {
      if (this.audio.lrc) {
        // 处理歌词
        var temp = this.audio.lrc.split("\r\n")
        temp = temp.splice(0, temp.length - 1)
        temp = temp.map(value => {
          var time = value.substr(1, 5)
          var seconds = parseInt(time.split(":")[0]) * 60 + parseInt(time.split(":")[1])
          var lrcContent = value.substr(10)
          return {
            seconds,
            lrcContent
          }
        })
        return temp
      }
    },
    lrcOffset () {
      if (this.songLrc) {
        var offset = (this.songLrc.length - document.querySelectorAll(".isCurrentLrc").length -2) * (-20)
        return this.audio.currentLength + offset - this.audio.currentLength
      }
    }
  },
  methods: {
    hideDetailPlayer () {
      this.$store.commit("showDetailPlayer", false);
    },
    rangeChange (event) {
      var offset = event.offsetX
      var rangeWidth = (document.documentElement.clientWidth - 20) * 0.8 - 20
      var clickLength = Math.floor(
        (offset * this.audio.songLength) / rangeWidth
      )
      if (offset < rangeWidth) {
        this.$store.commit("setAudioTime", clickLength)
        this.$store.commit("setCurrent", true)
      }
    },
    toggleStatus () {
      if (this.isPlay) {
        document.getElementById("player").pause()
      } else {
        document.getElementById("player").play()
      }
      this.$store.commit("isPlay", !this.isPlay)
    },
    prev () {
      this.$store.dispatch("prev")
    },
    next () {
      this.$store.dispatch("next")
    }
  },
  components: {
    [Range.name]: Range
  }
}
</script>

<style lang="less">
.detail-player {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 58px;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
}
.detail-player-bg {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 998;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  font-size: 14px;
}
.detail-player-content {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1000;
}
.detail-player-title {
  display: flex;
  justify-content: center;
  position: relative;
  width: 100%;
  height: 60px;
  line-height: 60px;
  background: -webkit-linear-gradient(top,rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0));
  color: #fff;
  font-size: 18px;
  text-align: center;
}
.detai-title-text {
  width: 70%;
}
.detail-player-back {
  position: absolute;
  left: 8px;
  top: 0;
  width: 24px;
  height: 80%;
  background: url("../assets/images/goback_icon.png") no-repeat center;
  background-size: 60% 60%;
}
.detail-player-img {
  width: 50%;
  margin: 30px auto;
}
.detail-player-img img {
  width: 100%;
}
.mt-range-thumb {
  width: 16px;
  height: 16px;
  top: 7px;
}
.detail-player-time {
  display: block;
  width: 10%;
  height: 30px;
  float: left;
  line-height: 30px;
  color: #fff;
  font-size: 12px;
  text-align: center;
}
.detail-player-time:nth-of-type(2) {
  float: right;
  margin-top: -30px;
}
.mt-range {
  width: 80%;
  padding: 0 10px;
  overflow: hidden;
}
.mt-range--disabled {
  opacity: 1;
}
.mt-range-content {
  margin-right: 7px;
  width: 100%;
}
.player-padding {
  padding: 0 20%;
}
.detail-player-control {
  margin-top: 10px;
}
.detail-player-btn {
  display: block;
  width: 33.3%;
  float: left;
  height: 100px;
}
.play-prev {
  background: url("../assets/images/play_prev.png") no-repeat;
  background-size: 60% auto;
  background-position: center;
}
.play-play {
  background: url("../assets/images/play_play.png") no-repeat;
  background-size: 80% auto;
  background-position: center;
}
.play-pause {
  background: url("../assets/images/play_pause.png") no-repeat;
  background-size: 80% auto;
  background-position: center;
}
.play-next {
  background: url("../assets/images/play_next.png") no-repeat;
  background-size: 60% auto;
  background-position: center;
}
.detail-player-lrc {
  width: 100%;
  height: 60px;
  overflow: hidden;
  margin-bottom: 20px;
  text-align: center;
  color: #d1c90e;
  line-height: 20px;
  font-size: 18px;
}
.lrc-content {
  transition: all 0.5s;
  transform: translateZ(0);
  font-size: 15px;
}
.lrc-content .isCurrentLrc{
  color: #fff;
}
</style>
