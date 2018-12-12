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
</style>

