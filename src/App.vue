<template>
  <div id="app">
    <c-header></c-header>
    <router-view/>
    <c-player></c-player>
    <c-detail-player></c-detail-player>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import CPlayer from '@/components/CPlayer'
import CDetailPlayer from './components/CDetailPlayer'
export default {
  name: 'App',
  components: {
    CHeader,
    CPlayer,
    CDetailPlayer
  }
}
</script>
<style lang="less">
@import 'assets/styles/common.less';
// 全局样式覆盖
.mint-cell-allow-right::after {
  width: 12px;
  height: 12px;
  right: 25px;
}
</style>

