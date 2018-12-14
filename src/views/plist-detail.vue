<template>
  <div class="plist-detail">
    <c-title-head
      :title="desc"
      :bgColor="bg"
      :color="'#fff'">
    </c-title-head>
    <div class="img-box">
			<img :src="imgurl">
		</div>
		<div class="plist-detail-list">
      <mt-cell
        v-for="(item, index) in plistDetailList"
        :title="item.filename"
        @click.native="playAudio(index)"
        :key="index"
      >
        <img src="../assets/images/download_icon.png" width="20" height="20">
      </mt-cell>
    </div>
  </div>
</template>
<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'plist-detail',
  data(){
    return {
      bg: '-webkit-linear-gradient(top,rgba(0,0,0,.6),rgba(0,0,0,0))',
      desc: '',
      imgurl: '',
      bannerInfo: null,
      plistDetailList: []
    }
  },
  created () {
    this.getPlistDetail()
  },
  methods: {
    getPlistDetail () {
      let id = this.$route.params.id
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$http.get(`/plist/list/${id}?json=true`).then(({data}) => {
        this.desc = data.info.list.specialname
        // 处理图片链接
        this.imgurl = data.info.list.imgurl.replace('{size}', '400')
        this.plistDetailList = data.list.list.info
      }).then(() => {
        Indicator.close()
      })
    },
  }
}
</script>
<style lang="less">
.plist-detail {
  .img-box {
    width: 100%;
    height: 256px;
    overflow: hidden;
    img {
      margin-top: -75px;
    }
  }
  .mint-cell {
    min-height: 52px!important;
  }
}
</style>

