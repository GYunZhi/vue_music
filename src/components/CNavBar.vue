<template>
  <div class="nav-bar-wrap">
    <mt-navbar v-model="selected" fixed>
      <mt-tab-item id="新歌"  @click.native="handleRoute('新歌')">新歌</mt-tab-item>
      <mt-tab-item id="排行"  @click.native="handleRoute('排行')">排行</mt-tab-item>
      <mt-tab-item id="歌单"  @click.native="handleRoute('歌单')">歌单</mt-tab-item>
      <mt-tab-item id="歌手"  @click.native="handleRoute('歌手')">歌手</mt-tab-item>
    </mt-navbar>
  </div>
</template>

<script>
import { Navbar, TabItem } from 'mint-ui'
export default {
  name: 'c-nav-bar',
  props: {
    type: {
      default: '新歌'
    }
  },
  data () {
    return {
      selected: this.type
    }
  },
  methods: {
    handleRoute (value) {
      switch (value) {
        case '新歌':
          this.$router.push({name: 'new-song'})
          break
        case '排行':
          this.$router.push({name: 'rank'})
          break
        case '歌单':
          this.$router.push({name: 'plist'})
          break
        case '歌手':
          this.$router.push({name: 'singer'})
          break
      }
    }
  },
  components: {
    [Navbar.name]: Navbar,
    [TabItem.name]: TabItem
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

