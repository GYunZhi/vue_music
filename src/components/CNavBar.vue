<template>
  <div class="nav-bar-wrap">
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item id="新歌">
        <router-link :to="{name: 'new-song'}">新歌</router-link>
      </mt-tab-item>
      <mt-tab-item id="排行">
        <router-link :to="{name: 'rank'}">排行</router-link>
      </mt-tab-item>
      <mt-tab-item id="歌单">
        <router-link :to="{name: 'plist'}">歌单</router-link>
      </mt-tab-item>
      <mt-tab-item id="歌手">
        <router-link :to="{name: 'singer'}">歌手</router-link>
      </mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
export default {
  name: 'cnavbar',
  props: {
    type: {
      default: '新歌'
    }
  },
  data () {
    return {
      selected: this.type
    }
  }
}
</script>

<style lang="less">
.nav-bar-wrap {
  height: 58px;
  box-shadow: 0 2px 2px 0 #f4f4f4;
  margin-bottom: 6px;
  .mint-navbar {
    height: 58px;
    padding: 0 0.15rem;
  }
  .mint-tab-item-label {
    font-size: 20px;
  }
  .mint-navbar.is-fixed {
    top: 58px;
  }
}

</style>

