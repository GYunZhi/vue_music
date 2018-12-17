<template>
  <div class="singer">
    <c-title-head :title="title" :height="54"/>
    <div class="singer-list">
      <div class="singer-item" v-for="(item,index) in singerList" :key="index">
        <mt-cell
          :title="item.singername"
          :to="{name: 'singer-detail', params: {id: item.singerid, title: item.singername}}"
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
  name: 'singer-list',
  data(){
    return {
      singerList: []
    }
  },
  mounted () {
    this.getList()
  },
  computed: {
    title () {
      return this.$route.params.title
    }
  },
  methods: {
    getList () {
      let id = this.$route.params.id
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      });
      this.$http.get(`/singer/list/${id}&json=true`).then(({data}) => {
        this.singerList = data.singers.list.info
      }).then(() => {
        Indicator.close()
      })
    }
  }
}
</script>
<style lang="less">
.singer{
  .singer-list {
    padding: 10px 0;
    .singer-item {
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
