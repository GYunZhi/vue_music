<template>
  <div id="app">
    <c-header></c-header>
    <c-nav-bar></c-nav-bar>
    <div class="container">
      <router-view/>
    </div>
  </div>
</template>

<script>
import CHeader from '@/components/CHeader'
import CNavBar from '@/components/CNavBar'
export default {
  name: 'App',
  components: {
    CHeader,
    CNavBar
  }
}
</script>

<style lang="less">
@import 'assets/styles/common.less';
@import 'assets/iconfont/iconfont.css';
</style>

