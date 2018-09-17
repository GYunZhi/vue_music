<template>
  <mt-header>
    <router-link class="logo" to="/" slot="left">
      <img src="../assets/images/logo.png" alt="">
    </router-link>
    <!-- <mt-button icon="search" slot="right"> -->
    <router-link class="search" slot="right" :to="{name: 'search'}">
      <i class="iconfont icon-unie036"></i>
    </router-link>
    <!-- </mt-button> -->
  </mt-header>
</template>

<script>
export default {
  name: 'cheader'
}
</script>

<style lang="less">
.logo {
  display: inline-block;
  width: 1.32rem;
  height: 0.3rem;
  // background: url('../assets/images/logo.png') no-repeat center center;
  img {
    width: 100%;
    height: 100%;
  }
}
.search {
  display: inline-block;
  width: 100%;
  height: 100%;
}
.mint-header {
  height: 0.58rem;
  padding: 0 0.15rem;
  i {
    font-size: 0.26rem;
  }
}
</style>

