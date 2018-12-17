<template>
  <div class="plist">
    <c-nav-bar type="歌单"></c-nav-bar>
    <div class="plist-list">
      <div class="plist-item" v-for="(item,index) in plistList" :key="index">
        <mt-cell
          :to="`/plist-detail/${item.specialid}`"
          is-link
          >
          <img slot="icon" :src="item.imgurl.replace('{size}', '400')">
          <div class="content">
            <p class="remark">{{item.specialname}}</p>
            <p class="play-count"><i class="iconfont icon-erji"></i> {{item.playcount}}</p>
          </div>
        </mt-cell>
      </div>
    </div>
  </div>
</template>

<script>
	import { Indicator } from 'mint-ui'
	export default {
    name: 'plist',
		data(){
			return {
				plistList: []
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
				this.$http.get('/plist/index&json=true').then((resp) => {
					this.plistList = resp.data.plist.list.info
				}).then(() => {
          Indicator.close()
        })
			}
		}
	}
</script>
<style lang="less">
.plist{
  .plist-list {
    padding: 10px 0;
    .plist-item {
      padding: 10px 0;
      margin-left: 16px;
      border-bottom: 1px solid #e5e5e5;
    }
    .content {
      width: 211px;
      height: 96px;
      color: #333;
      text-align: left;
      .remark {
        font-size: 18px;
        padding-top: 20px;
        line-height: 24px;
      }
      .play-count {
        height: 28px;
        line-height: 28px;
        color: #9b9b9b;
        font-size: 16px;
      }
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
  .mint-cell-value.is-link {
    margin-right: 42px;
  }
}
</style>
