<template>
  <div class="plist-detail">
    <c-title-head></c-title-head>
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
      bannerList: [],
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
        console.log(data)
        // this.bannerList = data.banner
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
  .mint-cell {
    min-height: 52px!important;
  }
}
</style>

