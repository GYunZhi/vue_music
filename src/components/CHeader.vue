<template>
  <div class="header-wrap">
    <mt-header fixed>
      <router-link class="logo" to="/" slot="left">
        <img src="../assets/images/logo.png" alt="">
      </router-link>
      <router-link class="search" slot="right" :to="{name: 'search'}">
        <i class="iconfont icon-unie036"></i>
      </router-link>
    </mt-header>
  </div>
</template>

<script>
import { Header } from 'mint-ui';
export default {
  name: 'c-header',
  components: {
    [ Header.name]: Header
  }
}
</script>

<style lang="less">
.header-wrap {
  height: 58px;
  .logo {
    display: inline-block;
    width: 2.64rem;
    height: 0.6rem;
    img {
      width: 100%;
      height: 100%;
    }
  }
  .search {
    display: inline-block;
    width: 100%;
    height: 100%;
    i {
      color: #fff;
    }
  }
  .mint-header {
    height: 58px;
    padding: 0 0.3rem;
    i {
      font-size: 26px;
    }
  }
}
</style>

