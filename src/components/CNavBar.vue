<template>
  <mt-navbar v-model="selected">
    <mt-tab-item id="1">
      <router-link :to="{name: 'new-song'}">新歌</router-link>
    </mt-tab-item>
    <mt-tab-item id="2">
      <router-link :to="{name: 'rank'}">排行</router-link>
    </mt-tab-item>
    <mt-tab-item id="3">
      <router-link :to="{name: 'plist'}">歌单</router-link>
    </mt-tab-item>
    <mt-tab-item id="4">
      <router-link :to="{name: 'singer'}">歌手</router-link>
    </mt-tab-item>
  </mt-navbar>
</template>

<script>
export default {
  name: 'cnavbar',
  data () {
    return {
      selected: '1'
    }
  }
}
</script>

<style lang="less">
.mint-navbar {
  padding: 0 0.15rem;
}
.mint-tab-item-label {
  font-size: 0.2rem;
}
</style>

