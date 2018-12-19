<template>
  <div class="search">
    <c-title-head :height="54"></c-title-head>

    <div class="search-box">
      <div class="search-input">
        <span class="search-icon"></span>
        <input type="text" v-model.trim="keyword" placeholder="歌手/歌名/拼音" @keydown.enter="search">
      </div>
      <a href="javascript:;" @click="search" class="search-btn">搜索</a>
    </div>

    <div class="search-list" v-show="toggle">
      <div class="search-list-title">最近热门</div>
      <mt-cell
        v-for="(item,index) in hotList"
        :title="item.keyword"
        @click.native="replaceInput(item.keyword)"
        :key="index"
      ></mt-cell>
    </div>

    <div class="songs-list" v-show="!toggle">
      <div class="search-total">共有{{total}}条搜索结果</div>
      <mt-cell
        v-for="(item,index) in songList"
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
import { Indicator, Toast } from "mint-ui"
const jsonp = require('jsonp')
export default {
  name: "search",
  data () {
    return {
      keyword: '',
      hotList: [],
      toggle: true,
      total: 0,
      songList: []
    };
  },
  mounted () {
    this.getList()
  },
  watch: {
    keyword (newVal) {
      if (newVal === '') {
        this.toggle = true
        // 清除上一次搜索结果
        this.total = 0
        this.songList = []
      }
    }
  },
  methods: {
    getList() {
      Indicator.open({
        text: '加载中...',
        spinnerType: 'snake'
      })
      jsonp('http://mobilecdn.kugou.com/api/v3/search/hot?format=jsonp&plat=0&count=30', null, (err, data) => {
        if (err) {
          console.error(err.message);
        } else {
          Indicator.close()
          this.hotList = data.data.info
        }
      })
    },
    replaceInput(item) {
      this.keyword = item
      this.search()
    },
    search() {
      if (this.keyword) {
        this.toggle = false
        Indicator.open({
          text: "加载中...",
          spinnerType: "snake"
        })
        this.$http.get(`/api/v3/search/song?format=json&keyword=${this.keyword}&page=1&pagesize=30&showtype=1`,{
          baseURL: 'sproxy'
        }).then(({ data }) => {
          this.songList = data.data.info
          this.total = data.data.total
          Indicator.close()
        })
      } else {
        Toast({
          message: '请输入关键字',
          position: 'middle',
          duration: 2000
        })
      }
    }
  }
}
</script>
<style lang="less">
.search-box {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  background-color: #fbfbfb;
  height: 55px;
}
.search-input {
  flex: 1;
  height: 100%;
  font-size: 15px;
  border: 1px solid #e5e5e5;
  border-radius: 7px;
  background-color: #fff;
}
.search-icon {
  display: block;
  float: left;
  width: 10%;
  height: 100%;
  background: url("http://m.kugou.com/v3/static/images/index/search_icon.png") no-repeat center;
  background-size: auto 100%;
}
.search-input input {
  width: 90%;
  height: 100%;
  display: inline-block;
  padding: 0 10px 0 0;
  border: none;
  outline: none;
  background-color: transparent;
}
.search-btn {
  display: block;
  height: 100%;
  width: 18%;
  background-color: #2ba2fa;
  border-radius: 7px;
  color: #fff;
  text-align: center;
  line-height: 35px;
  font-size: 15px;
  border: none;
  outline: none;
  margin-left: 8px;
}
.search-list-title {
  font-size: 16px;
  padding: 10px;
  color: deepskyblue;
}
.search-total {
  padding: 10px 10px;
  font-size: 18px;
  background-color: #e1e1e1;
  color: #484848;
}
</style>
