<template>
  <div class="new-song">
    <c-nav-bar></c-nav-bar>
    <mt-swipe :auto="5000">
			<mt-swipe-item v-for="item in bannerList" :key="item.id">
				<a :href="item.extra.tourl" target="_blank">
					<img :src="item.imgurl" :title="item.title">
				</a>
			</mt-swipe-item>
		</mt-swipe>
		<div class="song-list">
      <mt-cell
        v-for="(item, index) in songList"
        :title="item.filename"
        @click.native="playAudio(index)"
        :key="index"
      >
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator, Swipe, SwipeItem  } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'
export default {
  name: 'new-song',
  mixins: [PLAY_AUDIO],
  data(){
    return {
      bgColor: 'linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))',
      bannerList: [],
      songList: []
    }
  },
  created () {
    this.getSongs()
  },
  methods: {
    getSongs () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$http.get('/?json=true').then(({data}) => {
        this.bannerList = data.banner
        this.songList = data.data
      }).finally(() => {
        Indicator.close()
      })
    },
  },
  components: {
   [Swipe.name]: Swipe,
   [SwipeItem.name]: SwipeItem
  }
}
</script>
<style lang="less">
.new-song {
  .mint-swipe {
    height: 154px!important;
    // 处理轮播图切换时闪烁问题
    backface-visibility: hidden;
    transform-style: preserve-3d;
  }
  .mint-swipe img {
    width: 100%;
    height: 100%;
  }
	.mint-swipe-indicator {
		width: 12px!important;
		height: 12px!important;
	}
	.mint-swipe-indicators {
		bottom: 5px!important;
  }
  .mint-cell {
    min-height: 52px!important;
  }
  .mint-cell-title {
    padding: 0 0.12rem;
    line-height: 0.48rem;
  }
}
</style>

