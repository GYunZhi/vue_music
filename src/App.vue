<template>
  <div id="app">
    <mt-header>
      <router-link to="/" slot="left">
        <mt-button icon="back">返回</mt-button>
      </router-link>
      <mt-button icon="more" slot="right"></mt-button>
    </mt-header>

    <!-- CNavBar -->
    <router-view name="nav"/>

    <!-- CSearchBar -->
    <router-view name="search"/>

    <!-- 默认视图 -->
    <router-view/>


  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',
  created () {
    console.log(this)
    this.$http('/rank/list?json=true').then((resp) => {
      console.log('222', resp)
    })
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
