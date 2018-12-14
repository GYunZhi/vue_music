<template>
  <div class="c-title-head-wrap">
    <div class="c-title-head" :style="{background: bgColor, color}">
      <p class="back" @click="goBack"><i class="iconfont icon-xiangzuo"></i></p>
      <p class="title ellipsis">{{title}}</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'c-title-head',
  props: {
    title: {
      type: String,
      default: '搜索'
    },
    bgColor: {
      type: String,
      default: '#fff'
    },
    color: {
      type: String,
      default: '#333'
    }
  },
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="less" scoped>
.c-title-head-wrap {
  height: 54px;
}
.c-title-head {
  position: fixed;
  left: 0;
  top: 58px;
  display: flex;
  justify-content: center;
  width: 100%;
  z-index: 100;
  .back, .title {
    height: 54px;
    line-height: 54px;
    text-align: center;
    font-size: 16px;
  }
  .back {
    width: 48px;
    position: absolute;
    left: 0;
    top: 0;
    .icon-xiangzuo {
      font-size: 26px;
    }
  }
  .title {
    width: 80%;
  }
}
</style>
