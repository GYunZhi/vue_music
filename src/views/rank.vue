<template>
  <div class="rank">
    <c-nav-bar type="排行"></c-nav-bar>
    <div class="rank-list">
      <div class="rank-item" v-for="(item,index) in rankList" :key="index">
        <mt-cell
          :title="item.rankname"
          :to="`/rank/info/${item.rankid}`"
          is-link
          >
          <img slot="icon" :src="item.imgurl.replace('{size}', '400')">
        </mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'rank',
  data(){
    return {
      rankList: []
    }
  },
  mounted () {
    this.getList()
  },
  methods: {
    getList () {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$http.get('/rank/list&json=true').then(({data}) => {
        Indicator.close();
        this.rankList = data.rank.list
      });
    }
  }
}
</script>
<style lang="less">
.rank{
  .rank-list {
    padding: 10px 0;
    .rank-item {
      padding: 10px 0;
      margin-left: 16px;
      border-bottom: 1px solid #e5e5e5;
    }
  }
  .mint-cell {
    min-height: 52px;
    background: none;
  }
  .mint-cell-wrapper{
    font-size: 20px;
    background: none;
    padding: 0;
  }
  .mint-cell-title img {
    margin-right: 28px;
    width: 96px;
    height: 96px;
  }
}
</style>
