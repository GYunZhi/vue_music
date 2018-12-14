<template>
  <div class="singer">
    <c-nav-bar type="歌手"></c-nav-bar>
    <div class="singer-list">
      <div class="singer-item" v-for="(item,index) in singerList" :key="index">
        <mt-cell
          :title="item.classname"
          :to="`/singer/info/${item.classid}`"
          is-link>
        </mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
import { Indicator } from 'mint-ui'
export default {
  name: 'singer',
  data(){
			return {
				singerList: []
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
				this.$http.get('/singer/class&json=true').then(({data}) => {
					Indicator.close();
					this.singerList = data.list
				});
			}
		}
}
</script>
<style lang="less">
.singer{
  .singer-list {
    padding: 10px 0;
    .singer-item {
      background: #fbfbfb;
      border: 1px solid #e4e4e4;
      border-radius: 5px;
      margin: 10px 16px;
    }
  }
  .mint-cell {
    min-height: 52px;
    background: none;
  }
  .mint-cell-wrapper{
    font-size: 20px;
    background: none;
    padding-left: 0 0 0 10px;
  }
  .mint-cell-title img {
    margin-right: 28px;
    width: 96px;
    height: 96px;
  }
}
</style>
