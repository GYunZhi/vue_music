<template>
  <div id="app">
    <c-header></c-header>
    <router-view/>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
export default {
  name: 'App',
  components: {
    CHeader
  }
}
</script>
<style lang="less">
@import 'assets/styles/common.less';
@import 'assets/iconfont/iconfont.css';
// 全局样式覆盖
.mint-cell-allow-right::after {
  width: 12px;
  height: 12px;
  right: 25px;
}
</style>

