<template>
  <div class="rank-detail">
    <c-title-head
      :title="rankname"
      :bgColor="bg"
      :color="'#fff'">
    </c-title-head>
    <div class="img-box">
			<img :src="imgurl">
      <p class="rank-info-time">上次更新时间：{{getToday()}}</p>
		</div>
		<div class="rank-detail-list">
      <mt-cell
        v-for="(item, index) in songList"
        :title="item.filename"
        @click.native="playAudio(index)"
        :key="index"
      >
        <span
        slot="left"
        :class="['song-item-num', {one: index === 0 }, {two: index === 1 }, {three: index === 2 }]">
        {{index + 1}}</span>
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
import { PLAY_AUDIO } from '../mixins'
export default {
  name: 'rank-detail',
  mixins: [PLAY_AUDIO],
  data(){
    return {
      bg: '-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))',
      rankname: '',
      time: '',
      imgurl: '',
      songList: []
    }
  },
  created () {
    this.getRankDetail()
  },
  methods: {
    getRankDetail () {
      let id = this.$route.params.id
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$http.get(`/rank/info/${id}?json=true`).then(({data}) => {
        this.rankname = data.info.rankname
        // 处理图片链接
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
  }
}
</script>
<style lang="less">
.rank-detail {
  .img-box {
    position: relative;
    width: 100%;
    height: 256px;
    overflow: hidden;
    img {
      width: 100%;
      margin-top: -60px;
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
  .song-item-num {
    width: 20px;
    height: 20px;
    line-height: 20px;
    border-radius: 50%;
    position: absolute;
    top: 28%;
    left: 5px;
    text-align: center;
    font-size: 14px;
    color: #999;
    display: inline-block;
  }
  .song-item-num.one {
    background: #e80000;
    color: #fff;
  }
  .song-item-num.two {
    background: #e80000;
    color: #fff;
  }
  .song-item-num.three {
    background: #f8b300;
    color: #fff;
  }
  .mint-cell {
    min-height: 52px!important;
    padding: 4px 0;
  }
  .mint-cell-title {
    padding: 0 0.12rem 0 0.48rem;
    line-height: 0.48rem;
  }
}
</style>

