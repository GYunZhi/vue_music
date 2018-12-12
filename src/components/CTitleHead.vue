<template>
  <div class="c-title-head-wrap" :style="{background: bgColor, color}">
    <div class="c-title-head">
      <p class="back" @click="goBack"><i class="iconfont icon-xiangzuo"></i></p>
      <p class="title">{{title}}</p>
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
      default: '#000'
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
  top: 54px;
  width: 100%;
  .back, .title {
    line-height: 54px;
    text-align: center;
    font-size: 20px;
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
    float: left;
    width: 100%;
  }
}
</style>
