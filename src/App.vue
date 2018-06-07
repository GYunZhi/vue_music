<template>
  <div id="app">

    <mt-header fixed title="固定在顶部"></mt-header>

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
    axios('/proxy/rank/list?json=true').then((resp) => {
      console.log(resp)
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
