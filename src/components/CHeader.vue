<template>
  <div class="header">
    <mt-header title="long long long long title">
      <router-link to="/" slot="left">
        <mt-button icon="back">back</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>
  </div>
</template>

<script>
import { Header } from 'mint-ui'
export default {
  name: 'header'
}
</script>

<style lang="less">
</style>

