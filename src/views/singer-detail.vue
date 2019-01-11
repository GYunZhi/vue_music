<template>
  <div class="singer-detail">
    <c-title-head
      :title="title"
      :bgColor="bg"
      :color="'#fff'">
    </c-title-head>
    <div class="img-box">
			<img :src="imgurl">
		</div>
		<div class="singer-detail-list">
      <c-toggle>{{intro}}</c-toggle>
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
import { Indicator } from 'mint-ui'
import CToggle from '@/components/CToggle'
import { PLAY_AUDIO } from '../mixins'
export default {
  name: 'singer-detail',
  mixins: [PLAY_AUDIO],
  data(){
    return {
      bg: '-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))',
      intro: '',
      imgurl: '',
      songList: []
    }
  },
  created () {
    this.getSingerDetail()
  },
  computed: {
    title () {
      return this.$route.params.title
    }
  },
  methods: {
    getSingerDetail () {
      let id = this.$route.params.id
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$http.get(`/singer/info/${id}?json=true`).then(({data}) => {
        this.intro = data.info.intro
        // // 处理图片链接
        this.imgurl = data.info.imgurl.replace('{size}', '400')
        this.songList = data.songs.list
      }).finally(() => {
        Indicator.close()
      })
    },
    getToday () {
      const time = new Date()
      const year = time.getFullYear()
      let month = time.getMonth() + 1
      let date = time.getDate()
      if(month < 10) month = '0' + month
      if(date < 10) date = '0' + date
      return `${year}-${month}-${date}`
    }
  },
  components: {
    CToggle
  }
}
</script>
<style lang="less">
.singer-detail {
  .img-box {
    position: relative;
    width: 100%;
    height: 256px;
    overflow: hidden;
    img {
      width: 100%;
      margin-top: -75px;
    }
  }
  .rank-info-time {
    position: absolute;
    bottom: 20px;
    left: 20px;
    color: #fafff2;
    font-size: 18px;
    z-index: 101;
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

